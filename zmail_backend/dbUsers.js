import mongoose from 'mongoose'

const zmailUsersSchema = mongoose.Schema({
    name: String,
    password: String,
})

//collection
export default mongoose.model('users', zmailUsersSchema)