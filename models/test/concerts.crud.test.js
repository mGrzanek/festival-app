const mongoose = require('mongoose');
const Concert = require('./../concerts.models');
const expect = require('chai').expect;

describe('Concert CRUD', function() {
    before(async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/festivalDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {
        before(async() => {
            const testConcertOne = new Concert({
                performer: 'John',
                genre: 'Rock',
                price: 100,
                day: 1,
                image: 'img.png',
                workshops: ["ABC", "Lorem Ipsum"]
            });
            await testConcertOne.save();

            const testConcertTwo = new Concert({
                performer: 'Emilly',
                genre: 'Pop',
                price: 120,
                day: 2,
                image: 'picture.png',
                workshops: ["Soul", "Lorem Ipsum2"]
            });
            await testConcertTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const concert = await Concert.find();
            const expectedLength = 2;
            expect(concert.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "performer" with "findOne" method', async () => {
            const concert = await Concert.findOne({ performer: "Emilly" });
            const expectedName = "Emilly";
            expect(concert.performer).to.be.equal("Emilly");
        });

        after(async () => {
            await Concert.deleteMany();
        });
    });

    describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
            const concert = new Concert({
                performer: 'Eva',
                genre: 'Rock',
                price: 100,
                day: 1,
                image: 'img.png',
                workshops: ["ABC", "Lorem Ipsum"]
            });
            await concert.save();
            const savedConcert = await Concert.findOne({performer: "Eva"});
            expect(savedConcert.isNew).to.be.false;
        })
    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testConcertOne = new Concert({
                performer: 'John',
                genre: 'Rock',
                price: 100,
                day: 1,
                image: 'img.png',
                workshops: ["ABC", "Lorem Ipsum"]
            });
            await testConcertOne.save();

            const testConcertTwo = new Concert({
                performer: 'Emilly',
                genre: 'Pop',
                price: 120,
                day: 2,
                image: 'picture.png',
                workshops: ["Soul", "Lorem Ipsum2"]
            });
            await testConcertTwo.save(); 
        });

        it('should update one document with "updateOne" method', async () => {
            const concert = await Concert.updateOne({performer: "Emilly"}, {$set: {performer: "Eva"}});
            const updatedConcert = await Concert.findOne({performer: "Eva"});
            expect(updatedConcert).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const concert = await Concert.findOne({performer: "Emilly"});
            concert.performer = "Merry"
            await concert.save();
            const updatedConcert = await Concert.findOne({performer: "Merry"});
            expect(updatedConcert).to.not.be.null;
        });

        it('should update many documents with "updateMany" method', async () => {
            await Concert.updateMany({}, {$set: {day: 3} });
            const concerts = await Concert.find({day: 3});
            const expectedConcerts = 2;
            expect(concerts.length).to.be.equal(expectedConcerts);
            expect(concerts[0].day).to.be.equal(3);
            expect(concerts[1].day).to.be.equal(3);
        });

        afterEach(async () => {
            await Concert.deleteMany();
        });
    });

    describe('Removing data', async () => {
        beforeEach( async () => {
            const testConcertOne = new Concert({
                performer: 'John',
                genre: 'Rock',
                price: 100,
                day: 1,
                image: 'img.png',
                workshops: ["ABC", "Lorem Ipsum"]
            });
            await testConcertOne.save();

            const testConcertTwo = new Concert({
                performer: 'Emilly',
                genre: 'Pop',
                price: 120,
                day: 2,
                image: 'picture.png',
                workshops: ["Soul", "Lorem Ipsum2"]
            });
            await testConcertTwo.save(); 
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            const concert = await Concert.deleteOne({ performer: 'John' });
            const removedConcert = await Concert.findOne({performer: 'John'});
            expect(removedConcert).to.be.null;
        });
        
        it('should properly remove one document with "deleteOne" method', async () => {
            await Concert.deleteMany({});
            const concerts = await Concert.find();
            expect(concerts.length).to.be.equal(0);
        });
    });
});