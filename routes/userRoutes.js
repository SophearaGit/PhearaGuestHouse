const express = require('express');
const userController = require('../controllers/userControllers');

const router = express();

router.get('/', userController.getIndex);

router.get('/about', userController.getAbout);

router.get('/term', userController.getTerm);

router.get('/contact', userController.getContact);

router.get('/search', userController.getSearch);

module.exports = router;