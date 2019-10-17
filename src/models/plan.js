import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const PlanSchema = new mongoose.Schema({
    plan_type: {
        required: [true, 'Plan type is required.'],
        type: String,
        trim: true,
    },
    plan_name: {
        required: [true, 'plan name is required.'],
        type: String,
        trim: true,
    },
    plan_description1: {
        required: [true, 'plan description1 is required.'],
        type: String,
        trim: true,
    },
    plan_description2: {
        required: [true, 'plan description2 is required.'],
        type: String,
        trim: true,
    },
    plan_description3: {
        required: [true, 'plan description3 is required.'],
        type: String,
        trim: true,
    },
    plan_description4: {
        required: [true, 'plan description4 is required.'],
        type: String,
        trim: true,
    },
    plan_description5: {
        required: [true, 'plan description5 is required.'],
        type: String,
        trim: true,
    },
    plan_description5: {
        required: [true, 'plan description5 is required.'],
        type: String,
        trim: true,
    },
    plan_period:{
        required: [true, 'plan_period is required.'],
        type: Number,
        trim: true, 
    },
    plan_price:{
        required: [true, 'plan_price is required.'],
        type: Number,
        trim: true, 
    },
    plan_order:{
        required: [true, 'plan_order is required.'],
        type: Number,
        trim: true, 
    },
    plan_status:{
        required: [true, 'plan_status is required.'],
        type: Number,
        trim: true,  
    }
});


module.exports = {
    Plan: mongoose.model('Plan', PlanSchema)
}
