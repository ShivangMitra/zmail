import mongoose from 'mongoose'

const zmailHistorySchema = mongoose.Schema({
    from: String,
    to: String,
    cc: String,
    subject: String,
    senton: Number,
    mailbody:String,
})

//collection
export default mongoose.model('mailhistories', zmailHistorySchema)