const Seat = require('./../seats.model');
const expectParamValidationError = require('./utils/expectParamValidationError');

describe('Seat model', () => {
    const fields = [
        { name: 'day', type: 'Number' },
        { name: 'seat', type: 'Number' },
        { name: 'client', type: 'String' },
        { name: 'email', type: 'String' },
    ];

    const validData = {
        day: 1,
        seat: 5,
        client: 'John Doe',
        email: 'john@example.com'
    };

    const makeSeat = (data) => new Seat({ ...validData, ...data });

    it('should return an error if required fields are missing', async () => {
        const seat = new Seat({});
        await expectParamValidationError(seat, fields);
    });

    it('should return an error if field types are incorrect', async () => {
        const invalidValues = {
            String: [{}, [], null],
            Number: ['abc', {}, [], null],
        };

        for(let field of fields){
            for(let invalidValue of invalidValues[field.type]){
                const testData = {...validData, [field.name]: invalidValue };
                await expectParamValidationError(makeSeat(testData), field.name);
            }
        }
    });

    it('should throw an error if value is too short or too long', async () => {
        const cases = {
            day: [-50, -13, 0, 5, 44],
            seat: [-100, - 28, 0, 51, 100],
            client: ["", " ", "A", "AB", "A".repeat(61)],
            email: ["", " ", "@", "@l", "john@.com", "lorem#ipsum@example.com", "a".repeat(35) + "@example.com" ],
        };

        for(let data in cases) {
            for(let value of cases[data]){
                const testData = {...validData, [data]: value};
                await expectParamValidationError(makeSeat(testData), data);
            }
        }
    });

    it('should throw an error if email value incorrect', async () => {
        const cases = [" ", "lorem", "@co", "example@aa", "@", "example.aa.c"];
        for(let data of cases) {
            const testData = {...validData, email: data};
            await expectParamValidationError(makeSeat(testData), "email");
        }
    });

    it('should validate successfully if client value contains polish signs', async () => {
        const cases = ["Łukasz Ćwik", "Łucja Iks", "Żaneta Łęgocka"];

        for(let data of cases){
            const testData = {...validData, client: data};
            const seat = makeSeat(testData);
            await seat.validate();
        }
    });

    it('should validate successfully with correct types and all required fields', async () => {
         const cases = {
            day: [1, 2, 3],
            seat: [1, 10, 22, 49, 50],
            client: ["John Doe", "EMILLY sWAN", "Jimmy", "Eva Smith-JJ", "JAN ŻUKOWSKI "],
            email: ["d@d.co", "doe@example.com", "john_doe@example.com", "john-doe@exam.co", "johndoe@em.co", "a".repeat(28) + "@example.com"],
        };

        for(let param in cases) {
            for(let value of cases[param]){
                const testData = {...validData, [param]: value}
                const seat = makeSeat(testData);
                await seat.validate();
            }
        }
    });
});