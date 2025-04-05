const express = require('express');
const router = express.Router();
const TestimonialController = require('./../controllers/testimonials.controller');

router.route('/testimonials/random').get(TestimonialController.getRandom);

router.route('/testimonials').get(TestimonialController.getAll);

router.route('/testimonials/:id').get(TestimonialController.getOne);

router.route('/testimonials').post(TestimonialController.addNew);

router.route('/testimonials/:id').put(TestimonialController.editOne);

router.route('/testimonials/:id').delete(TestimonialController.removeOne);

module.exports = router;