import mongoose from 'mongoose';
import validator from 'validator';
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// Setup schema

export const citySchema = new mongoose.Schema({
    name: {
        type: String, 
        required:[true, 'City name is required.'],
        trim: true 
    },
    state: {
        type: String, 
        required:[true, 'Short name is required.'],
        trim: true  
    },
    state_id:{
        type: Schema.Types.ObjectId, 
        ref: 'State'
        
    },
    slug:{
        type:String,
        default:true
    },
    lat:{
        type: String, 
        required:[true, 'Short name is required.'],
    },
});

module.exports = {
    City: mongoose.model('City', citySchema)
}