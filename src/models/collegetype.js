import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const CollegeTypeSchema = new mongoose.Schema({
    typename: {
        required: [true, 'college type is required.'],
        type: String,
        enum: {
            values: ["Private", "Public"],
            message: "Not a valid enum"
        },
        trim: true,
        require: true
    }
});


module.exports = {
    Collegetype: mongoose.model('Collegetype', CollegeTypeSchema)
}
