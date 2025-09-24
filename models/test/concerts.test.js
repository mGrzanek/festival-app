const expect = require('chai').expect;
const Concert = require('./../concerts.models'); 
const expectParamValidationError = require('./utils/expectParamValidationError');

describe('Concert Model', () => {
    const fields = [
        { name: 'performer', type: 'String' },
        { name: 'genre', type: 'String' },
        { name: 'price', type: 'Number' },
        { name: 'day', type: 'Number' },
        { name: 'image', type: 'String' },
        { name: 'workshops', type: 'Array' }
    ];

    const validData = {
        performer: 'John',
        genre: 'Rock',
        price: 100,
        day: 1,
        image: 'img.png',
        workshops: ["ABC", "Lorem Ipsum"]
    };

    const makeConcert = (data) => new Concert({...validData, ...data});

    it('should return an error if required fields are missing', async () => {
        const concert = new Concert({});
        await expectParamValidationError(concert, fields);
    });

    it('should return an error if field types are incorrect', async () => {
        const invalidValues = {
            String: [{}, [], null],
            Array: [{}, [], null],
            Number: ['abc', {}, [], null],
        };

        for(let field of fields) {
            for(let invalidValue of invalidValues[field.type]) {
                const testData = { ...validData, [field.name]: invalidValue };
                await expectParamValidationError(makeConcert(testData), field.name);
            }
        }
    });

    it('should throw an error if value is too short or too long', async () => {
        const cases = {
            performer: ["    ", " ", "A".repeat(46)],
            genre: [" ",  "", "A".repeat(26)],
            price: [-50, -3, 0],
            day: [-40, -6, 0, 5, 14, 100],
            image: [" ", "", ".jpeg", "A".repeat(42) + ".jpg" ],
            workshops: ["A", "A".repeat(31), " " ]
        };

        for(let param in cases) {
            for(let value of cases[param]){
                const testData = { ...validData, [param]: value}
                await expectParamValidationError(makeConcert(testData), param);
            }
        }
    });

    it('should throw an error if image extension is not .jpg, .jpeg, .png, .gif or .webp', async () => {
        const cases = [ "lorem", "abc.mp3", "lorem.txt", "loremipsum.pdf"];
        for(let data of cases){
            const testData = {...validData, image: data};
            await expectParamValidationError(makeConcert(testData), "image");
        }
    });

    it('should validate successfully with correct types and all required fields', async () => {
        const cases = {
            performer: ["Eva", "John Doe", "Swiss2", "1234Oh!"],
            genre: ["Pop", "Rock", "Country", "Reggae"],
            price: [10, 55, 100],
            day: [1, 2, 3],
            image: ["abc12345.jpg", "abc.png", "abc.gif", "loremipsum.webp", "loremipsum.jpeg"],
            workshops: ["ABC", "123", "Dance and Fun"],
        };

        for(let data in cases) {
            for(let value of cases[data]){
                const testData = { ...validData, [data]: value};
                const concert = makeConcert(testData);
                await concert.validate();   
            }       
        }
    });
});
