import { Schema, model, Document } from "mongoose"

interface User extends Document{
    
    username : string,
    email: string,
    password: string
}

const userSchema = new Schema<User>({

    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    }
})

export default model<User>('User', userSchema)