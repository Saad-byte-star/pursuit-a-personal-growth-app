const mailSchema = new mongoose.Schema({
    To: {
        type: String,
        required: true // Recipient's email address
    },
    Subject: {
        type: String,
        required: true // Email subject
    },
    Body: {
        type: String,
        required: true // Email body content
    },
    Type: {
        type: String,
        enum: ["Reminder", "Motivational"], // Type of email
        required: true
    },
    Status: {
        type: String,
        enum: ["Pending", "Sent"], // Email status
        default: "Pending"
    },
    SentAt: {
        type: Date, // Timestamp when the email was sent
        default: null
    },
    CreatedAt: {
        type: Date,
        default: Date.now // Timestamp when the email record was created
    }
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;
