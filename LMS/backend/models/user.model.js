import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken';
import crypto from 'crypto'
const userSchema=new Schema({
    name:{
type:'String',
required:[true,'name is required'],
minLength:[5,'name should be greater than 5 characters'],
maxLength:[50,'name should be less than 50 characters'],

lowercase:true,
trim:true,
    },
    email:{
type:'String',
required:[true,'email is required'],
lowercase:true,
trim:true,
unique:true,
match:[/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,'please fill valid email address']
    },
    password:{
type:'String',
required:[true,'password is required'],
minLength:[8,'password must be 8 characters'],
select:false
    },
    avatar:{
        public_id:{
type:'string'
        },
        secure_url:{
            type:'String'
        }
    },
    role:{
type:'String',
enum:['USER','ADMIN'],
default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{
    timestamps:true
});
userSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))
    {
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
});
userSchema.methods={
    generateJWTToken:async function()
    {
        return await JWT.sign(
            {id:this._id,email:this.email,subscription:this.subscription,role:this.role},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);

    },
    generatePasswordResetToken:async function(){
        const resetToken=crypto.randomBytes(20).toStirng('hex');
        this.forgotPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry=Date.now()+15*60*1000;
    }
}
const User=model('User',userSchema);
export default User;