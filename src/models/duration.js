import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const DurationSchema = new mongoose.Schema({
    duration_type: {
        required: [true, 'Duration type is required.'],
        type: String,
        enum: {
            values: ["1 Year", "2 Year", "3 Year", "4 Year"],
            message: "Not a valid enum"
        },
        trim: true,
        require: true
    }
});


module.exports = {
    Duration: mongoose.model('Duration', DurationSchema)
}
