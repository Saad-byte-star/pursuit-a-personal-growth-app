const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    QuestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest', // Reference to the Quest this reminder is linked to
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who set the reminder
        required: true
    },
    ReminderDate: {
        type: Date,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ["Pending", "Sent"], // You can add more statuses if needed
        default: "Pending"
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
