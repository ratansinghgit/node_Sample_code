import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const CourseSchema = new mongoose.Schema({
    coursetype: {
        required: [true, 'coursetype is required.'],
        type: String,
        enum: {
            values: ["Degree", "Diploma", "Certification"],
            message: "Not a valid enum"
        },
        trim: true,
        require: true
    },
    duration:{
        type:String
    }
});

module.exports = {
    Courses: mongoose.model('Courses', CourseSchema)
}
