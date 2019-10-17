import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema
export const ReviewSchema = new mongoose.Schema({
    review: {
        required: [true, 'Review is required.'],
        type: String,
        trim: true,
    },
    collegeid:{
        type: Schema.Types.ObjectId, 
        ref: 'College',
        require: true  
    },
    userid:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require: true  
    },
    academy:{
        type: String,
        require: true  
    },
    faculty:{
        type: String,
        require: true  
    },
    infrastructure:{
        type: String,
        require: true   
    },
    foodaccodomation:{
        type: String,
        require: true   
    },
    placement:{
        type: String,
        require: true 
    },
    sociallife:{
        type: String,
        require: true
    },
    text:{
        type: String,
        require: true
    },
    pubdate:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true

    }
});


module.exports = {
    Review: mongoose.model('Review', ReviewSchema)
}
