import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const ExamSchema = new mongoose.Schema({
    ExamName: {
        required: [true, 'coursetype is required.'],
        type: String,
        enum: {
            values: ["JEE Main", "Gate", "CAT", "MAT", "XAT", "NEET"],
            message: "Not a valid enum"
        },
        trim: true,
        require: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = {
    Exam: mongoose.model('Exam', ExamSchema)
}
