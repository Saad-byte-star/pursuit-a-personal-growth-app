const mongoose = require('mongoose');


const questSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        enum: ["personal", "collaborative"],
        required: true
    },
    Difficulty: {
        type: String,
        enum: ["Normal Grade", "Special Grade", "Legendary Grade"],
        required: true
    },
    Status: {
        type: String,
        enum: ["Available", "In-Progress", "Cleared"],
        default: "Available"
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // assuming you have a User collection
        required: true
    },
    AssignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // assuming you have a User collection
    }],
    Milestones: [{
        
        type : mongoose.Schema.Types.ObjectId,
        ref : "Milestone"
    }], // Array of milestones
    DueDate: {
        type: Date
    },
    Reminders: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Reminder"
    }], // Array of reminders
}, 
{ 
    timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

// Create the Quest model
const Quest = mongoose.model("Quest", questSchema);

module.exports = Quest;