import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const BrouchureSchema = new mongoose.Schema({
    brouchurepath: {
        required: [true, 'brouchurepath is required.'],
        type: String,
        require: true
    }
});


module.exports = {
    Brouchure: mongoose.model('Brouchure', BrouchureSchema)
}
