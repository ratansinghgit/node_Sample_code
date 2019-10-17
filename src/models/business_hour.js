import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema
export const BusinessHourSchema = new mongoose.Schema({
    place_id: {
        required: [true, 'place_id is required.'],
        type: String,
        trim: true,
    },
    day:{
        type: String,
        require: true  
    },
    open:{
        type: String,
        require: true  
    },
    close:{
        type: String,
        require: true  
    }    
});
module.exports = {
    BusinessHour: mongoose.model('BusinessHour', BusinessHourSchema)
}
