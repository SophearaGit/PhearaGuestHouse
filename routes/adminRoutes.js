const express = require('express');
const adminController = require('../controllers/adminControllers');
const fs = require('fs');

const router = express();

// LOGIN
router.get('/admin', adminController.getLogin);
router.post('/admin', adminController.postLogin);

// DASHBOARD
router.get('/admin/dashboard', adminController.getDashboard)

// ROOM => SELECT / INSERT
router.get('/admin/room', adminController.getRoom)
router.post('/admin/room', adminController.postRoom)
// ROOM => DELETE
router.get('/admin/room/delete/:id', adminController.deleteRoom)
// ROOM => EDIT / UPDATE
router.get('/admin/room/edit/:id', adminController.edit_getRoom)
router.post('/admin/room/edit/', adminController.edit_postRoom)

// BOOKING
router.get('/admin/booking', adminController.getBooking)

module.exports = router;
