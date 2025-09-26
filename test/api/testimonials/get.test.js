const server = require('./../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const Testimonial = require('./../../../models/testimonials.model');

describe('GET /api/testimonials', () => {
    before(async() => {
        const testTestimonialOne = new Testimonial({
            _id: '5d9f1140f10a81216cfd4408',
            author: 'Emilly Doe',
            text: 'Lorem ipsum'
        });
        await testTestimonialOne.save();
    });

    it('/ should return all testimonials', async() => {
        const res = await request(server).get('/api/testimonials');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('/:id should return one testimonial by :id ', async () => {
        const res = await request(server).get('/api/testimonials/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Testimonial.deleteMany();
    });
});