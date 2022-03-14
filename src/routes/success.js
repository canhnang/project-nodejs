const express = require('express');
const router = express.Router();

const SuccessController = require('../app/controllers/SuccessController');

router.get('/todos', SuccessController.index);

module.exports = router;