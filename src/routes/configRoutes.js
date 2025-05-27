const express = require('express');
const { getConfig, updateConfig } = require('../controllers/configController');
const router = express.Router();

router.route('/')
    .get(getConfig)
    .post(updateConfig);

module.exports = router;