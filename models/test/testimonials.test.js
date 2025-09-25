const Testimonial = require('./../testimonials.model');
const expectParamValidationError = require('./utils/expectParamValidationError');

describe('Testimonial model', () => {
    const fields = [
        { name: 'author', type: 'String' },
        { name: 'text', type: 'String'},
    ];

    const validData = {
        author: 'John Doe',
        text: 'Lorem ipsum'
    };

    const makeTestimonial = (data) => new Testimonial({...validData, ...data});
    
    it('should throw an error if required fields are missing', async () => {
        const testimonial = new Testimonial({});
        await expectParamValidationError(testimonial, fields);
    });

    it('should throw an error if field types are incorrect', async () => {
        const invalidValues = {
            String: [{}, [], null],
        };

        for(let field of fields){
            for(let invalidValue of invalidValues[field.type]){
                const testData = { ...validData, [field.name]: invalidValue};
                await expectParamValidationError(makeTestimonial(testData), field.name);
            }
        }
    });

    it('should throw an error if value is too short or too long', async () => {
        const cases = {
            author: ["", " ", "A", "ab", "a".repeat(61), "a".repeat(100)],
            text: ["", " ", "A", "ab", "a".repeat(101)],
        };

        for(let param in cases){
            for(let value of cases[param]){
                const testData = {...validData, [param]: value};
                await expectParamValidationError(makeTestimonial(testData), param);
            }
        }
    });

    it('should validate successfully with correct types and all required fields', async () => {
        const cases = {
            author: ["Eva", "John Doe", "A".repeat(60)],
            text: ["abc", "lorem ipsum", "A".repeat(100)],
        }

        for(let param in cases){
            for(let value of cases[param]){
                const testData = {...validData, [param]: value};
                const testimonial = makeTestimonial(testData);
                await testimonial.validate();
            }
        }
    })
})