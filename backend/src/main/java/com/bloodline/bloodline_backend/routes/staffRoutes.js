const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticateToken, authorizeStaff } = require('../middleware/auth');

// Apply authentication and authorization middleware to all routes
router.use(authenticateToken);
router.use(authorizeStaff);

// Dashboard
router.get('/dashboard', staffController.getDashboardStats);

// Booking Management
router.get('/bookings', staffController.getAllBookings);
router.post('/bookings', staffController.createBooking);
router.patch('/bookings/:bookingID/status', staffController.updateBookingStatus);

// Consultation Management
router.get('/consultations', staffController.getAllConsultations);
router.post('/consultations', staffController.createConsultation);
router.patch('/consultations/:consultationID', staffController.updateConsultation);

// Sample Management
router.get('/samples', staffController.getAllSamples);
router.post('/samples', staffController.createSample);
router.patch('/samples/:sampleID/status', staffController.updateSampleStatus);

// Test Result Management
router.get('/test-results', staffController.getAllTestResults);
router.post('/test-results', staffController.createTestResult);
router.patch('/test-results/:testResultID', staffController.updateTestResult);

module.exports = router; 