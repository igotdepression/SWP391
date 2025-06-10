const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consultation = sequelize.define('Consultation', {
    consultationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookingID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    consultantUserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    consultationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    consultationMode: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Scheduled'
    },
    feedbackID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    paymentID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Consultation',
    timestamps: false
});

module.exports = Consultation; 