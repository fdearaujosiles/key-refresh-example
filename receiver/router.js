const { answerSignal, initSignal } = require('./receiver');
const router = require('express').Router();

router.route('/init')
    .get(initSignal);

router.route('/auth')
    .get(answerSignal);

module.exports = router