import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const CustomFieldSchema = new mongoose.Schema({
    field_name: {
        required: [true, 'field_name is required.'],
        type: String,
        trim: true,
    },
    field_type:{
        type:String,
        trim: true,
    },
    values_list:{
        type:String,
        trim: true,
    },
    tooltip:{
        type:String,
        trim: true,  
    },
    icon:{
        type:String,
        trim: true,  
    },
    required:{
        type:Number,
        trim: true,  
    },
    searchable:{
        type:Number,
        trim: true,  
    },
    field_order:{
        type:String,
        trim: true, 
    },
    field_status:{
        type:String,
        trim: true,  
    }
});
module.exports = {
    CustomField: mongoose.model('CustomField', CustomFieldSchema)
}
