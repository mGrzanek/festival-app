const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const Seat = require('./../../../models/seats.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/seats', () => {
    before(async () => {
        const testSeatOne = new Seat({
            _id: '5d9f1140f10a81216cfd4408',
            day: 1,
            seat: 5,
            client: 'John Doe',
            email: 'john@example.com'
        });
        await testSeatOne.save();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/seats/5d9f1140f10a81216cfd4408').send({ 
            seat: 7, 
            client: 'John Doe',
            email: 'john@example.com',
            day: 1 
        });
        const seat = await Seat.findOne({_id: '5d9f1140f10a81216cfd4408'});

        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(seat.seat).to.be.equal(7);;
    });

    after(async () => {
        await Seat.deleteMany();
    });

});