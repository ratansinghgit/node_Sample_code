import mongoose from 'mongoose';
import validator from 'validator';
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// Setup schema

export const organizationSchema = new mongoose.Schema({
    organizationname: {
        type: String, 
        required:[true, 'Organization Name is required.'],
        trim: true 
    },
    address1: {
        type: String, 
        required:[true, 'AddressLine1 is required.'],
        trim: true 
    },
    address2: {
        type: String, 
        //required:[true, 'AddressLine2 is required.'],
        trim: true 
    },
    lat: {
        type: Number, 
        trim: true 
    },
    lng: {
        type: Number, 
        trim: true 
    },
    city: {
        type: Schema.Types.ObjectId, 
        ref: 'Citys'
    },
    state: {
        type: Schema.Types.ObjectId, 
        ref: 'States'
    },
    country: {
        type: Schema.Types.ObjectId, 
        ref: 'Countrys'
    },
    contactno: {
        type: String,
        required: [true, 'Contact No is required.'],
        index: true, 
        unique: true
    },
    pincode: {
        type: Number, 
        required:[true, 'PinCode is required.'],
        trim: true 
    },
    logo: {
        type: String, 
        //required:[true, 'logo is required.'],
        trim: true 
    },
    fleetmanager:{
        type:Boolean
    },
    status:{
        type:Boolean,
        default:true
    }
});


organizationSchema.pre('save', function (next) {
    var self = this;
    mongoose.model('Organization', organizationSchema).find({contactno : self.contactno}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            next({
                "name": "ContactExist",
                "type": "ValidatorError",
                "message": "Contact no already exist",
                "path": "Contact no already exist"
            });
        }
    });
}) ;

module.exports = {
    Organization: mongoose.model('Organization', organizationSchema)
}

