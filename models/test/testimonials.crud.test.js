const mongoose = require('mongoose');
const Testimonial = require('./../testimonials.model');
const expect = require('chai').expect;

describe('Testimonial CRUD', function() {
    before(async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/festivalDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {
        before(async() => {
            const testTestimonialOne = new Testimonial({
                author: 'John Doe',
                text: 'Lorem ipsum'
            });
            await testTestimonialOne.save();

            const testTestimonialTwo = new Testimonial({
                author: 'Emilly Doe',
                text: 'Lorem ipsum2'
            });
            await testTestimonialTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const testimonial = await Testimonial.find();
            const expectedLength = 2;
            expect(testimonial.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "author" with "findOne" method', async () => {
            const testimonial = await Testimonial.findOne({ author: "John Doe" });
            const expectedClient = "John Doe";
            expect(testimonial.author).to.be.equal(expectedClient);
        });

        after(async () => {
            await Testimonial.deleteMany();
        });
    });

    describe('Creating data', () => {
        it('should insert new document with "save" method', async () => {
            const testimonial = new Testimonial({
                author: 'Emilly Doe',
                text: 'Lorem ipsum'
            });
            await testimonial.save();
            const savedTestimonial = await Testimonial.findOne({author: "Emilly Doe"});
            expect(savedTestimonial.isNew).to.be.false;
        })
    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testTestimonialOne = new Testimonial({
                author: 'John Doe',
                text: 'Lorem ipsum'
            });
            await testTestimonialOne.save();

            const testTestimonialTwo = new Testimonial({
                author: 'Emilly Doe',
                text: 'Lorem ipsum2'
            });
            await testTestimonialTwo.save();
        });

        it('should update one document with "updateOne" method', async () => {
            await Testimonial.updateOne({author: "Emilly Doe"}, {$set: {author: "Merry Smith"}});
            const updatedTestimonial = await Testimonial.findOne({author: "Merry Smith"});
            expect(updatedTestimonial).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const testimonial = await Testimonial.findOne({author: "Emilly Doe"});
            testimonial.author = "Merry Smith"
            await testimonial.save();
            const updatedTestimonial = await Testimonial.findOne({author: "Merry Smith"});
            expect(updatedTestimonial).to.not.be.null;
        });

        it('should update many documents with "updateMany" method', async () => {
            await Testimonial.updateMany({}, {$set: {text: "Updated!"} });
            const testimonials = await Testimonial.find({text: "Updated!"});
            const expectedTestimonials = 2;
            expect(testimonials.length).to.be.equal(expectedTestimonials);
            expect(testimonials[0].text).to.be.equal("Updated!");
            expect(testimonials[1].text).to.be.equal("Updated!");
        });

        afterEach(async () => {
            await Testimonial.deleteMany();
        });
    });

    describe('Removing data', async () => {
        beforeEach( async () => {
            const testTestimonialOne = new Testimonial({
                author: 'John Doe',
                text: 'Lorem ipsum'
            });
            await testTestimonialOne.save();

            const testTestimonialTwo = new Testimonial({
                author: 'Emilly Doe',
                text: 'Lorem ipsum2'
            });
            await testTestimonialTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Testimonial.deleteOne({ author: 'John Doe' });
            const removedTestimonial = await Testimonial.findOne({author: 'John Doe'});
            expect(removedTestimonial).to.be.null;
        });
        
        it('should properly remove one document with "deleteOne" method', async () => {
            await Testimonial.deleteMany({});
            const testimonials = await Testimonial.find();
            expect(testimonials.length).to.be.equal(0);
        });
    });
});