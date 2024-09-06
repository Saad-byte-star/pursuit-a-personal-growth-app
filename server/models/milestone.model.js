const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ["Pending", "Completed"], // Can be expanded based on need
        default: "Pending"
    },
    DueDate: {
        type: Date,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to a user in case of a collaborative milestone
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = milestoneSchema;