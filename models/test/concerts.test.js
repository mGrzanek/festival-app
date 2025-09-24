const expect = require('chai').expect;
const Concert = require('./../concerts.models'); 

describe('Concert Model', () => {

    it('should return an error if required fields are missing', async () => {
        const concert = new Concert({});

        try {
            await concert.validate();
            throw new Error('Validation should have failed');
        } catch (err) {
            expect(err.errors.performer).to.exist;
            expect(err.errors.genre).to.exist;
            expect(err.errors.price).to.exist;
            expect(err.errors.day).to.exist;
            expect(err.errors.image).to.exist;
            expect(err.errors.workshops).to.exist;
        }
    });

    it('should return an error if field types are incorrect', async () => {
        const validData = {
            performer: 'John',
            genre: 'Rock',
            price: 100,
            day: 1,
            image: 'img.png',
            workshops: []
        };

        const invalidValues = {
            String: [{}, [], null],
            Number: ['abc', {}, [], null],
        };

        const fields = [
            { name: 'performer', type: 'String' },
            { name: 'genre', type: 'String' },
            { name: 'price', type: 'Number' },
            { name: 'day', type: 'Number' },
            { name: 'image', type: 'String' },
            { name: 'workshops', type: 'String' }
        ];

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
        const cases = [
            {performer: "     ", genre: "", price: -50, day: 5, image: "abc", workshops: []},
            {performer: " ", genre: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. ", price: 0, day: -50, image: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. ornare diam vitae orci convallis efficitur.jpg", workshops: []},
            {performer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare diam vitae orci convallis efficitur. Euallo via met ornare diam vitae orci convallis efficitur.", genre: " ", price: -100, day: 10, image: "lorem.abc", workshops: []},
        ];

        for(let param of cases) {
            const concert = new Concert(param);
            try {
                await concert.validate();
                throw new Error('Validation should have failed');
            } catch (err) {
                for(let val in param) {
                    expect(err.errors[val]).to.exist;
                }
            }
        }
    });

    it('should validate successfully with correct types and all required fields', async () => {
        const cases = [
            {performer: "Eva", genre: "Pop", price: 50, day: 2, image: "e.jpg", workshops: ["Dance & Fun", "BASS"]},
            {performer: "John Doe", genre: "Rock", price: 30, day: 1, image: "john.png", workshops: ["GF", "SCW"]},
            {performer: "Swiss", genre: "Country", price: 40, day: 3, image: "swiss.jpg", workshops: ["Country style"]},
        ];
        
        for(let data of cases) {
            const concert = new Concert(data);
            await concert.validate();          
        }
    });
});
