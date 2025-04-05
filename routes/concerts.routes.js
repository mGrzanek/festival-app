const express = require('express');
const router = express.Router();
const ConcertController = require('./../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);

router.route('/concerts/:id').get(ConcertController.getOne);

router.route('/concerts').post(ConcertController.addNew);

router.route('/concerts/:id').put(ConcertController.editOne);

router.route('/concerts/:id').delete(ConcertController.removeOne);

module.exports = router;