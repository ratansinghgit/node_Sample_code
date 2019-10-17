import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const StreamSchema = new mongoose.Schema({
    streamname: {
        required: [true, 'Stream name is required.'],
        type: String,
        enum: {
            values: ["Management", "Science", "Engineering", "Commerce", "Computer Application", "Education"],
            message: "Not a valid enum"
        },
        trim: true,
        require: true
    }
});


module.exports = {
    Stream: mongoose.model('Stream', StreamSchema)
}
