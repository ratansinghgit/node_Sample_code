import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const AffiliatedSchema = new mongoose.Schema({
    university_name: {
        required: [true, 'University name is required.'],
        type: String,
    },
    address:{
        required: [true, 'address is required.'],
        type: String,
    },
    address:{
        required: [true, 'address is required.'],
        type: String,
    },
    email:{
        required: [true, 'email is required.'],
        type: String,  
    },
    country:{
        required: [true, 'email is required.'],
        type: String,  
    },
    state:{
        required: [true, 'email is required.'],
        type: String,  
    },
    city:{
        required: [true, 'email is required.'],
        type: String,  
    }
});


module.exports = {
    Affiliated: mongoose.model('Affiliated', AffiliatedSchema)
}
