const chai = require('chai');
const chaiHttp = require('chai-http');
const Seat = require('./../../../models/seats.model');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server');

describe('POST /api/seats', () => {
    it('/ should insert new document to db and return success', async () => {
        await Seat.deleteMany();
        const res = await request(server).post('/api/seats').send({
            day: 2,
            seat: 6,
            client: 'Emilly Doe',
            email: 'emilly@example.com'
        });

        const seat = await Seat.findOne({ client: 'Emilly Doe'});

        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(seat).to.not.be.null;
    });
     after(async () => {
        await Seat.deleteMany();
    });
});
