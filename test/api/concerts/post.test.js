const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('./../../../models/concerts.models');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server');

describe('POST /api/concerts', () => {
    it('/ should insert new document to db and return success', async () => {
        await Concert.deleteMany();
        const res = await request(server).post('/api/concerts').send({
            performer: 'Emilly',
            genre: 'Pop',
            price: 120,
            day: 2,
            image: 'picture.png',
            workshops: ["Soul", "Lorem Ipsum2"]
        });

        const concert = await Concert.findOne({ performer: 'Emilly'});

        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(concert).to.not.be.null;
    });
     after(async () => {
        await Concert.deleteMany();
    });
});
