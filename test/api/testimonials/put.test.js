const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const Testimonial = require('./../../../models/testimonials.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/testimonials', () => {
    before(async () => {
        const testTestimonialOne = new Testimonial({
            _id: '5d9f1140f10a81216cfd4408',
            author: 'Emilly Doe',
            text: 'Lorem ipsum',
        });
        await testTestimonialOne.save();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/testimonials/5d9f1140f10a81216cfd4408').send({ 
            _id: '5d9f1140f10a81216cfd4408',
            author: 'Emilly Doe',
            text: 'Test',
        });
        const testimonial = await Testimonial.findOne({_id: '5d9f1140f10a81216cfd4408'});

        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(testimonial.text).to.be.equal('Test');;
    });

    after(async () => {
        await Testimonial.deleteMany();
    });

});