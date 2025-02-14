const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator=require('validator')

const userSchema = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

userSchema.statics.signup = async function(email,password){
    //validation
    if(!email || !password){
        throw Error("All fields must be filled!")
    }
    if(!validator.isEmail(email)){
        throw Error('Enter valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Enter a strong password")
    }
    const existingUser = await this.findOne({ email });
    if(existingUser){
        throw Error("Email already in use!")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({email,password:hash})
    return user
}

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("All fields must be filled!")
    }
    const user = await this.findOne({email})
    
    if(!user){
        throw Error('Account with Email not found!')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect Credentials!')
    }
    return user
}

module.exports=mongoose.model('User',userSchema)