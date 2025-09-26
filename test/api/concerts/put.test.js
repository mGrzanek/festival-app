const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const Concert = require('./../../../models/concerts.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({
            _id: '5d9f1140f10a81216cfd4408',
            performer: 'John',
            genre: 'Rock',
            price: 100,
            day: 1,
            image: 'img.png',
            workshops: ["ABC", "Lorem Ipsum"]
        });
        await testConcertOne.save();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/concerts/5d9f1140f10a81216cfd4408').send({ 
            performer: 'John',
            genre: 'Pop',
            price: 100,
            day: 1,
            image: 'img.png',
            workshops: ["ABC", "Lorem Ipsum"]
        });
        const seat = await Concert.findOne({_id: '5d9f1140f10a81216cfd4408'});

        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(seat.genre).to.be.equal('Pop');;
    });

    after(async () => {
        await Concert.deleteMany();
    });

});