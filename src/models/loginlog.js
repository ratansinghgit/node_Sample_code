import mongoose  from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;
// Setup schema

export const loginlogSchema = new mongoose.Schema({
    vehicleid: {
        type: Schema.Types.ObjectId, 
        //required:true,
        ref: 'Evehicle' 
    },
    userid: {
        type: Schema.Types.ObjectId, 
        required:true,
        ref: 'User' 
    },
    mobilenumber: {
        type: Number, 
        required:[true, 'MobileNumber is required.'],
        trim: true 
    },
    telemetryboardid: {
        type: String, 
        //required:[true, 'Telemetry BoardId is required.'],
        trim: true 
    },
    logindatetime: {
        type: Date, 
        required:[true, 'Login DateTime is required.'],
        trim: true,
        default:Date.now() 
    },
    islogout:{
        type:Boolean,
        default:false
    },
    deviceid: {
        type: String
    },
    // meterreading: {
    //     type: String, 
    //     required:[true, 'MeterReading is required.'],
    //     trim: true 
    // },
    // vehiclestart: {
    //     type: Boolean, 
    //     required:[true, 'VehicleStart is required.'],
    //     trim: true 
    // },
    // batterychargingStatus: {
    //     type: Boolean, 
    //     required:[true, 'Battery Charging Status is required.'],
    //     trim: true 
    // },
    currentlat: {
        type: Number, 
        //required:[true, 'Current Latitude is required.'],
        trim: true 
    },
    currentlng: {
        type: Number, 
        //required:[true, 'Current Longitude is required.'],
        trim: true 
    },
    isauthenticated:{
        type: Boolean, 
        required:[true, 'IsAuthenticated is required.'],
        trim: true,
        default:false
    },
    type:{
        type:Object
    },
    BookingData:{
        type:Object
    },
    lastauthenticatedtime:{
        type:Date
    }
});


module.exports = {
   LoginLog: mongoose.model('addLoginLog', loginlogSchema)
}
