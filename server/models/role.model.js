const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    Id : {
        type : mongoose.SchemaTypes.Number,
        required : true
    },
    Title : {
        type : mongoose.SchemaTypes.String,
        required : true,
        unique : true
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;