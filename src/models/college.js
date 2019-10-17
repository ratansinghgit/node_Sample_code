import mongoose from 'mongoose';
// Setup schema
var CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        //required: true
    },
    longitude: {
        type: String,
        //required: true
    },
    rankbyid: {
        type: String,
        //required: true
    },
    established: {
        type: String,
        //required: true
    },
    affiliatedto: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },  
    twitter: {
        type: String,
        required: true
    },
    googlepage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    submission_date: {
        type: String,
        required : true,
        default:Date
    },
    facilities: {
        type: String,
        required: true,
    },
    Plan: {
        type: String,
        required: true
    }
});
module.exports = {
    College: mongoose.model('College', CollegeSchema)
}


