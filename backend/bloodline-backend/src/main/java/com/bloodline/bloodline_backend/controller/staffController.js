const Booking = require('../models/Booking');
const Consultation = require('../models/Consultation');
const Sample = require('../models/Sample');
const TestResult = require('../models/TestResult');
const { Op } = require('sequelize');

// Booking Management
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                { model: require('../models/AppUser'), as: 'user' },
                { model: require('../models/Service'), as: 'service' }
            ]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingID } = req.params;
        const { status } = req.body;
        
        const booking = await Booking.findByPk(bookingID);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();
        
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consultation Management
exports.getAllConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.findAll({
            include: [
                { model: Booking, as: 'booking' },
                { model: require('../models/AppUser'), as: 'consultant' }
            ]
        });
        res.json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.create(req.body);
        res.status(201).json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateConsultation = async (req, res) => {
    try {
        const { consultationID } = req.params;
        const consultation = await Consultation.findByPk(consultationID);
        
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        await consultation.update(req.body);
        res.json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sample Management
exports.getAllSamples = async (req, res) => {
    try {
        const samples = await Sample.findAll({
            include: [
                { model: Booking, as: 'booking' },
                { model: require('../models/Participant'), as: 'participant' }
            ]
        });
        res.json(samples);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSampleStatus = async (req, res) => {
    try {
        const { sampleID } = req.params;
        const { status, receivedDate } = req.body;
        
        const sample = await Sample.findByPk(sampleID);
        if (!sample) {
            return res.status(404).json({ message: 'Sample not found' });
        }

        sample.status = status;
        if (receivedDate) {
            sample.receivedDate = receivedDate;
        }
        
        await sample.save();
        res.json(sample);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSample = async (req, res) => {
    try {
        const sample = await Sample.create(req.body);
        res.status(201).json(sample);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Test Result Management
exports.getAllTestResults = async (req, res) => {
    try {
        const testResults = await TestResult.findAll({
            include: [
                { model: Booking, as: 'booking' }
            ]
        });
        res.json(testResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTestResult = async (req, res) => {
    try {
        const testResult = await TestResult.create(req.body);
        res.status(201).json(testResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTestResult = async (req, res) => {
    try {
        const { testResultID } = req.params;
        const testResult = await TestResult.findByPk(testResultID);
        
        if (!testResult) {
            return res.status(404).json({ message: 'Test result not found' });
        }

        await testResult.update(req.body);
        res.json(testResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalBookings = await Booking.count();
        const pendingBookings = await Booking.count({
            where: { status: 'Pending' }
        });
        const totalConsultations = await Consultation.count();
        const pendingConsultations = await Consultation.count({
            where: { status: 'Scheduled' }
        });
        const totalSamples = await Sample.count();
        const pendingSamples = await Sample.count({
            where: { status: 'Pending' }
        });
        const totalTestResults = await TestResult.count();
        const pendingTestResults = await TestResult.count({
            where: { resultStatus: 'Pending' }
        });

        res.json({
            bookings: {
                total: totalBookings,
                pending: pendingBookings
            },
            consultations: {
                total: totalConsultations,
                pending: pendingConsultations
            },
            samples: {
                total: totalSamples,
                pending: pendingSamples
            },
            testResults: {
                total: totalTestResults,
                pending: pendingTestResults
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 