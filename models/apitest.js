const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const ApitestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

ApitestSchema.plugin(timestamp);

const Apitest = mongoose.model('Apitest', ApitestSchema);
module.exports = Apitest;