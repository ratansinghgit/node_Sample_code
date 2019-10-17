import mongoose  from 'mongoose';
import validator from 'validator';
// Setup schema

export const RankSchema = new mongoose.Schema({
    rankname: {
        required: [true, 'Rankname is required.'],
        type: String,
        trim: true,
    }
});


module.exports = {
    Rank: mongoose.model('Rank', RankSchema)
}
