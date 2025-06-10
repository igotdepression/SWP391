const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TestResult = sequelize.define('TestResult', {
    testResultID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookingID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    resultDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    resultStatus: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    resultContent: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'TestResult',
    timestamps: false
});

module.exports = TestResult; 