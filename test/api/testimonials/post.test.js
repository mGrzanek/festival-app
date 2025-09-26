const server = require('./../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const Testimonial = require('./../../../models/testimonials.model');

describe('POST /api/testimonials', () => {
    it('/ should insert new document to db and return success', async () => {
        await Testimonial.deleteMany();
        const res = await request(server).post('/api/testimonials').send({
            author: 'Emilly Doe',
            text: 'Lorem ipsum',
        });

        const testimmonial = await Testimonial.findOne({ author: 'Emilly Doe' });
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(testimmonial).to.not.be.null;
    });

    after(async () => {
        await Testimonial.deleteMany();
    });
})