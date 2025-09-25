const mongoose = require('mongoose');
const Seat = require('./../seats.model');
const expect = require('chai').expect;

describe('Seat CRUD', function() {
    this.timeout(10000);
    before(async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/festivalDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {
        before(async() => {
            const testSeatOne = new Seat({
                day: 1,
                seat: 5,
                client: 'John Doe',
                email: 'john@example.com'
            });
            await testSeatOne.save();

            const testSeatTwo = new Seat({
                day: 2,
                seat: 6,
                client: 'Emilly Doe',
                email: 'emilly@example.com'
            });
            await testSeatTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const seat = await Seat.find();
            const expectedLength = 2;
            expect(seat.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "client" with "findOne" method', async () => {
            const seat = await Seat.findOne({ client: "John Doe" });
            const expectedClient = "John Doe";
            expect(seat.client).to.be.equal(expectedClient);
        });

        after(async () => {
            await Seat.deleteMany();
        });
    });

    describe('Creating data', () => {
        it('should insert new document with "save" method', async () => {
            const seat = new Seat({
                day: 2,
                seat: 6,
                client: 'Emilly Doe',
                email: 'emilly@example.com'
            });
            await seat.save();
            const savedSeat = await Seat.findOne({client: "Emilly Doe"});
            expect(savedSeat.isNew).to.be.false;
        })
    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testSeatOne = new Seat({
                day: 1,
                seat: 5,
                client: 'John Doe',
                email: 'john@example.com'
            });
            await testSeatOne.save();

            const testSeatTwo = new Seat({
                day: 2,
                seat: 6,
                client: 'Emilly Doe',
                email: 'emilly@example.com'
            });
            await testSeatTwo.save();
        });

        it('should update one document with "updateOne" method', async () => {
            await Seat.updateOne({client: "Emilly Doe"}, {$set: {client: "Merry Smith"}});
            const updatedSeat = await Seat.findOne({client: "Merry Smith"});
            expect(updatedSeat).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const seat = await Seat.findOne({client: "Emilly Doe"});
            seat.client = "Merry Smith"
            await seat.save();
            const updatedSeat = await Seat.findOne({client: "Merry Smith"});
            expect(updatedSeat).to.not.be.null;
        });

        it('should update many documents with "updateMany" method', async () => {
            await Seat.updateMany({}, {$set: {day: 3} });
            const seats = await Seat.find({day: 3});
            const expectedSeats = 2;
            expect(seats.length).to.be.equal(expectedSeats);
            expect(seats[0].day).to.be.equal(3);
            expect(seats[1].day).to.be.equal(3);
        });

        afterEach(async () => {
            await Seat.deleteMany();
        });
    });

    describe('Removing data', async () => {
        beforeEach( async () => {
            const testSeatOne = new Seat({
                day: 1,
                seat: 5,
                client: 'John Doe',
                email: 'john@example.com'
            });
            await testSeatOne.save();

            const testSeatTwo = new Seat({
                day: 2,
                seat: 6,
                client: 'Emilly Doe',
                email: 'emilly@example.com'
            });
            await testSeatTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Seat.deleteOne({ client: 'John Doe' });
            const removedSeat = await Seat.findOne({client: 'John Doe'});
            expect(removedSeat).to.be.null;
        });
        
        it('should properly remove one document with "deleteOne" method', async () => {
            await Seat.deleteMany({});
            const seats = await Seat.find();
            expect(seats.length).to.be.equal(0);
        });
    });
});