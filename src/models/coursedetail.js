import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const CourseDetailsSchema = new mongoose.Schema({
    collegeid: {
        required: [true, 'collegeid is required.'],
        type: String,
        require: true
    },
    courseid:{
        type: Schema.Types.ObjectId, 
        ref: 'Courses',
        require: true
    },
    durationid:{
        type: Schema.Types.ObjectId, 
        ref: 'Duration',
        require: true
    },
    programtypeid:{
        type: Schema.Types.ObjectId, 
        ref: 'Program',
        require: true 
    },
    entranceexamid:{
        type: Schema.Types.ObjectId, 
        ref: 'Program',
        require: true  
    },
    streamid:{
        type: Schema.Types.ObjectId, 
        ref: 'Stream',
        require: true  
    },
    rankid:{
        type: Schema.Types.ObjectId, 
        ref: 'Rank',
        require: true  
    },
    brouchureid:{
        type: Schema.Types.ObjectId, 
        ref: 'Brouchure',
        require: true  
    },
    coursefees:{
        type: Schema.Types.ObjectId, 
        ref: 'Program',
        require: true  
    }
});


module.exports = {
    CoursesDetail: mongoose.model('CoursesDetail', CourseDetailsSchema)
}
