const mongoose = require('mongoose');

// Define the Collaboration schema
const collaborationSchema = new mongoose.Schema({
    LeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user leading the collaboration
        required: true
    },
    TeamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Array of user references involved in the collaboration
    }],
    Quests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest' // Array of quests being worked on in the collaboration
    }]
}, { timestamps : true });

const Collaboration = mongoose.model('Collaboration', collaborationSchema);

module.exports = Collaboration;
