import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Setup schema
var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required : true
    },
    usertypeid:{
        type: Schema.Types.ObjectId, 
        ref:'UserType'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    cityname: {
        type: String
        //required: true
    },
    countryname: {
        type: String
        //required: true
    },
    contact: {
        type: Number
    },
    dob:{
        type:String
    },
    gender:{
        type:String,
    },
    profile_pic_status:{
        type:String
    }
});

UserSchema.pre('save', function (next) {
    var self = this;
    mongoose.model('User', UserSchema).find({ email: self.email }, function (err, docs) {
        if (!docs.length) {
            next();
        } else {
            next({
                "name": "EmailExist",
                "type": "ValidatorError",
                "message": "Email already exist",
                "path": "Email already exist"
            });
        }
    });
    mongoose.model('User', UserSchema).find({ contact: self.contact }, function (err, docs) {
        if (!docs.length) {
            next();
        } else {
            next({
                "name": "ContactExist",
                "type": "ValidatorError",
                "message": "Contact no already exist111",
                "path": "Contact no already exist"
            });
        }
    });
});

module.exports = {
    User: mongoose.model('User', UserSchema)
}


