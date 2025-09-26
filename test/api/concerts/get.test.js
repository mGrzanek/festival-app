const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('./../../../models/concerts.models');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server');

describe('GET /api/concerts', () => {
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

        const testConcertTwo = new Concert({
            _id: '5d9f1159f81ce8d1ef2bee48',
            performer: 'Emilly',
            genre: 'Pop',
            price: 120,
            day: 2,
            image: 'picture.png',
            workshops: ["Soul", "Lorem Ipsum2"]
        });
        await testConcertTwo.save();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
    });
});