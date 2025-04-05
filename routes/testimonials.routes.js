const express = require('express');
const router = express.Router();
const Testimonial = require('./../models/testimonials.model');

router.route('/testimonials/random').get( async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        if(count > 0) {
            const rand = Math.floor(Math.random() * count);
            const randomData = await Testimonial.findOne().skip(rand);
            res.json(randomData);
        } else res.status(404).json({ message: 'Empty testimonials database.'});   
    } catch (error){
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials').get( async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        if(testimonials.length > 0) res.json(testimonials);
        else res.status(404).json({ message: 'Empty testimonials database.'});
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials/:id').get( async (req, res) => {
    try {
        const selectedData = await Testimonial.findById(req.params.id);
            if(selectedData) res.json(selectedData);
            else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials').post( async (req, res) => {
    try {
        const { author, text } = req.body;
        if( author && text ) {
            const newTestimonial = new Testimonial({ author, text });
            await newTestimonial.save();
            res.json({ message: 'OK' });
        } else res.status(400).json({ message: 'All params are required.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials/:id').put( async (req, res) => {
    try {
        const { author, text } = req.body;
        const dataToEdit = await Testimonial.findById(req.params.id);
        if(dataToEdit){
            if(author && text) {
                await dataToEdit.updateOne({$set: {author, text}});
                res.json({ message: 'OK' });
            } else res.status(400).json({ message: 'All params are required.' });
        } else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error){
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.route('/testimonials/:id').delete( async (req, res) => {
    try {
        const dataToRemove = await Testimonial.findById(req.params.id);
        if(dataToRemove) {
            await dataToRemove.deleteOne();
            res.json({ message: 'OK '});
        } else res.status(404).json({ message: 'This id does not exist.' });
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

module.exports = router;