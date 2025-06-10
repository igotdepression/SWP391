const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sample = sequelize.define('Sample', {
    sampleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    surchargeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookingID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    participantID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    sampleType: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    receivedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'Sample',
    timestamps: false
});

module.exports = Sample; 