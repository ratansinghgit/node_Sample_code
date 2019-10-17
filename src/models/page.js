import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const PageSchema = new mongoose.Schema({
    page_title: {
        required: [true, 'page_title is required.'],
        type: String,
        trim: true,
    },
    page_slug:{
        required: [true, 'page_slug is required.'],
        type: String,
        trim: true, 
    },
    meta_desc:{
        required: [true, 'meta_desc is required.'],
        type: String,
        trim: true, 
    },
    page_contents:{
        required: [true, 'page_contents is required.'],
        type: String,
        trim: true, 
    },
    page_group:{
        required: [true, 'page_group is required.'],
        type: String,
        trim: true, 
    },
    page_order:{
        required: [true, 'page_order is required.'],
        type: Number,
        trim: true, 
    }
});


module.exports = {
    Page: mongoose.model('Page', PageSchema)
}
