import { IUser } from "@/types/user.types";
import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

interface UserDocument extends Omit<IUser,'_id'>, Document{
    comparePass(candidatePassword: string): boolean
}

const userSchema = new mongoose.Schema<UserDocument>({

    name:{
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minlength: [6, 'Minimum 6 characters required']
    },
    mobile: {
        type: String,
        minlength: [10, 'Minimum 10 characters required'],
        maxlength: [10, 'Minimum 10 characters required']
    }
},{
    timestamps: true
})

userSchema.pre('save', function(): void {
    if(!this.isModified) return
    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePass = function(candidatePassword: string): boolean{
    return bcrypt.compareSync(candidatePassword, this.password)
}

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;