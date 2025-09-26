const chai = require('chai');
const chaiHttp = require('chai-http');
const Seat = require('./../../../models/seats.model');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server');

describe('GET /api/seats', () => {
    before(async () => {
        const testSeatOne = new Seat({
            _id: '5d9f1140f10a81216cfd4408',
            day: 1,
            seat: 5,
            client: 'John Doe',
            email: 'john@example.com'
        });
        await testSeatOne.save();

        const testSeatTwo = new Seat({
            _id: '5d9f1159f81ce8d1ef2bee48',
            day: 2,
            seat: 6,
            client: 'Emilly Doe',
            email: 'emilly@example.com'
        });
        await testSeatTwo.save();
    });

    it('/ should return all seats', async () => {
        const res = await request(server).get('/api/seats');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return one seat by :id ', async () => {
        const res = await request(server).get('/api/seats/5d9f1159f81ce8d1ef2bee48');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Seat.deleteMany();
    });
});