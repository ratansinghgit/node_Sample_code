import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const ProgramSchema = new mongoose.Schema({
    program_name: {
        required: [true, 'program name is required.'],
        type: String,
        enum: {
            values: ["Full Time", "Part Time", "Correspondence"],
            message: "Not a valid enum"
        },
        trim: true
    }
});


module.exports = {
    Program: mongoose.model('Program', ProgramSchema)
}
