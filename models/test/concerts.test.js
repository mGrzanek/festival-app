const expect = require('chai').expect;
const Concert = require('./../concerts.models'); 

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

    it('should return an error if required fields are missing', async () => {
        const concert = new Concert({});
        try {
            await concert.validate();
            throw new Error('Validation should have failed');
        } catch (err) {
            for(let field of fields){
                expect(err.errors[field.name]).to.exist;
            }
        }
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
                const concert = new Concert(testData);
                try {
                    await concert.validate();
                    throw new Error('Validation should have failed');
                } catch (err) {
                    expect(err.errors[field.name]).to.exist;
                }
            }
        }
    });

    it('should throw an error if value is too short or too long', async () => {
        const cases = {
            performer: ["    ", " ", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. Euallo via met ornare diam vitae orci convallis efficitur."],
            genre: [" ",  "", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. "],
            price: [-50, -3, 0],
            day: [-40, -6, 0, 5, 14, 100],
            image: [" ", "", ".jpeg", ".jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. ornare diam vitae orci convallis efficitur.jpg" ],
            workshops: ["A", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. Euallo via met ornare diam vitae orci convallis.", " " ]
        };

        for(let param in cases) {
            for(let value of cases[param]){
                const testData = { ...validData, [param]: value}
                const concert = new Concert(testData);
                try {
                    await concert.validate();
                    throw new Error('Validation should have failed.');
                } catch(err) {
                    expect(err.errors[param]).to.exist;
                }
            }
        }
    });

    it('should throw an error if image extension is not .jpg, .jpeg, .png, .gif or .webp', async () => {
        const cases = [ "lorem", "abc.mp3", "lorem.txt", "loremipsum.pdf"];
        for(let data of cases){
            const testData = {...validData, image: data};
            const concert = new Concert(testData);
            try {
                await concert.validate();
                throw new Error('Validation should have failed.');
            } catch(err) {
                expect(err.errors.image).to.exist;
            }
        }
    });

    it('should validate successfully with correct types and all required fields', async () => {
        const cases = {
            performer: ["Eva", "John Doe", "Swiss2", "1234Oh!"],
            genre: ["Pop", "Rock", "Country", "Reggae"],
            price: [10, 55, 100],
            day: [1, 2, 3],
            image: ["abc12345.jpg", "abc.png", "abc.gif", "loremipsumdolorsitametvialavitea.webp", "loremipsum.jpeg"],
            workshops: ["ABC", "123", "Dance and Fun"],
        };

        for(let data in cases) {
            for(let value of cases[data]){
                const testData = { ...validData, [data]: value};
                const concert = new Concert(testData);
                await concert.validate();   
            }       
        }
    });
});
