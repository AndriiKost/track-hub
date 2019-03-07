const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Application Schema
const ApplicationSchema = Schema({
    companyName: {
        type: String,
        required: true
    },
    dateApplied: {
        type: String,
        required: true
    },
    lastUpdate: {
        type: String,
        require: true
    },
    recrutingHelp: {
        type: Boolean,
        required: false
    },
    currentApplicationStatus: {
        type: String,
        required: true
    },
    recruterInfo: {
        recrutingCompanyName: {
            type: String,
            required: false
        },
        nameOfRecruiter: {
            type: String,
            required: false
        },
    }
    
});

module.exports = Application = mongoose.model("applications", ApplicationSchema);