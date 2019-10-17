import mongoose from 'mongoose';
import validator from 'validator';
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// Setup schema

export const StateSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:[true, 'Country name is required.'],
        trim: true 
    },
    state_abbr:{
        type: String, 
        required:[true, 'Short name is required.'],
        trim: true 
    },
    slug:{
        type:String,
        default:true
    },
    country_abbr:{
        type:String,
        default:true
    },
    country_id:{
        type: Schema.Types.ObjectId, 
        ref: 'Country',
        require: true 
    }
});

module.exports = {
    State: mongoose.model('State', StateSchema)
}

