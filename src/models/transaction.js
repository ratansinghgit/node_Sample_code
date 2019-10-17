import mongoose from 'mongoose';
import validator from 'validator';
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// Setup schema

export const TransactionSchema = new mongoose.Schema({
    ipn_description: {
        type: String, 
        required:[true, 'ipn_description required.'],
        trim: true 
    },
    payer_email:{
        type: String, 
        required:[true, 'Short name is required.'],
        trim: true 
    },
    txn_type:{
        type:String,
        default:true
    },
    payment_status:{
        type:String,
        default:true
    },
    amount:{
        type:String,
        default:true
    },
    txn_id:{
        type:String,
        default:true
    },
    parent_txn_id:{
        type:String,
        default:true
    },
    subscr_id:{
        type:String,
        default:true
    },
    ipn_response:{
        type:String,
        default:true
    },
    ipn_vars:{
        type:String,
        default:true
    },
    txn_date:{
        type:String,
        default:true
    }
});

module.exports = {
    Transaction: mongoose.model('Transaction', TransactionSchema)
}
