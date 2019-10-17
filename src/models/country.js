import mongoose from 'mongoose';
import validator from 'validator';
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// Setup schema

export const countrySchema = new mongoose.Schema({
    name: {
        type: String, 
        required:[true, 'Country name is required.'],
        trim: true 
    },
    country_name:{
        type: String, 
        required:[true, 'Short name is required.'],
        trim: true 
    },
    country_abbr:{
        type:String,
        default:true
    },
    slug:{
        type:String,
        default:true
    }
});

module.exports = {
    Country: mongoose.model('Country', countrySchema)
}

