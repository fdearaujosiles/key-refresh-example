const { answerSignal, initKey } = require('./receiver');
const router = require('express').Router();

router.route('/init')
    .get((req, res) => res.send(initKey()));

router.route('/auth')
    .get(answerSignal);

module.exports = router