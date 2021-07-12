import mongoose from 'mongoose'

const zmailSchema = mongoose.Schema({
    from: String,
    to: String,
    cc: String,
    subject: String,
    scheduled: Number,
    latestdate: Number,
    mailbody:String,
})

//collection
export default mongoose.model('mails', zmailSchema)