import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import cloudinary from 'cloudinary'
import fs from 'fs';
import crypto from 'crypto'
import { log } from "console";
const cookieOptions={
    maxAge :7*24*60*60*1000,
    httpOnly:true,
    secure:true
}
const register=async(req,res,next)=>{
   
const {fullname,email,password}=req.body;
if(!fullname||!email||!password)
{
    return next(new AppError('all fields are required',400));
}
    const userExists=await User.findOne({email});
    if(userExists)
    {
        return next(new AppError('email already exists',400));
    }
    const user=await User.create({
        fullname,
        email,
        password,
        avatar:{
            public_id:email,
            // secure_url:
        }
    });
    if(!user)
    {
        return next(new AppError('registration failed try again',400));
        
    }
    if(req.file)
    {
        console.log(req.file);
        try{
            const result=cloudinary.v2.uploader.upload(req.file.path,{
           folder:'/WITHBACKEND/LMS/backend/uploads',
           width:250,     
           height:250,
           gravity:'faces',
           crop:'fill'
            });
            if(result)
            {

                user.avatar.public_id= result.public_id;
                user.avatar.secure_url= result.secure_url;
                fs.rm(`uploads/${req.file.filename}`)
            }
        }catch(e){
        return next(new AppError(error||'uploaded cancel',500));
            
        }
    }
    await user.save();
    user.password=undefined;
    const token=await user.generateJWTToken();
    res.cookie=('token',token,cookieOptions);
    res.status(201).json({
success:true,
message:'USer registered succesfully',
user,
    });

};
const login=async(req,res)=>{
try{
    const {email,password}=req.body;
if(!email||!password)
{
    return next(new AppError('all fields are required',400));
}
const user=await User.findOne({email}).select('+password');
if(!user||!user.comparePassword(password))
{
    return next(new AppError('email or password doesnt match',400));

}
const token=user.generateJWTToken();
user.password=undefined;
res.cookie('token',token,cookieOptions);
res.status(200).json({
    success:true,
    message:'user logged in succesfully',
    user,
});

}catch(e)
{
    return next(new AppError(e.message,500));

}
};
const logout=(req,res)=>{
res.cookie('token',null,{
secure:false,
maxAge:0,
httpOnly:true,
});
res.status(200).json({
    success:true,
    message:'user loggedout successfully'
})
};
const getProfile=async (req,res)=>{
try{
    const userId=req.user.id;
    const user= await User.findById(userId);
    res.status(200).json({
        success:true,
        message:'user loggedout successfully'
    })

}
catch(e)
{
    return next(new AppError('Failed to fetch profile details',500));

}
};
const forgotpassword=async (req,res,next)=>{
const {email}=req.body;
if(!email)
{
    return next(new AppError('Email is required',400));
}
const user= await User.findOne({email});
if(!user)
{
    return next(new AppError('Email not registered',400));

}

const resetToken=await user.generatePasswordResetToken();
await user.save();
const resetPasswordURL=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
const subject='Reset password';
const message=`You can reset your password by clicking <a href=${resetPasswordURL} target`;
try{
    await sendEmail(email,subject,message);
    res.status(200).json({
        success:true,
        message:`reset password has been sent to ${emial} successfully`
    })
}catch(e){
    user.forgotPasswordExpiry=undefined;
    user.forgotPasswordToken=undefined;
    return next(new AppError(e.message,500));

}
};
const resetpassword=async (req,res)=>{
const {resetToken}=req.params;
const {password}=req.body;
const forgotPasswordToken=crypto.createHash('sh256').update(resetToken).digest('hex');
const user=await user.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry:{$gt:Date.now()}
});
if(!user)
{
    return next(new AppError('token is invalid or expired try again',400))
}
user.password=password; 
user.forgotPasswordToken=undefined;
user.forgotPasswordExpiry=undefined;
user.save();
res.status(200).json({
    success:true,
    message:'password changed successfully'
})
};
const changePassword=async (req,res)=>{
    const {oldPassword,newPassword}=req.body;
    const{id}=req.user;
    if(!oldPassword||!newPassword)
    {
    return next(new AppError('All fields are mandatory',400))

    }

    const user=await User.findById(id).select('+password');
    if(!user)
    {
        return next(new AppError('user doesnt exists',400))
    }
    const isPasswordValid=await User.comparePassword(oldPassword);
    if(!isPasswordValid)
    {
        return next(new AppError('user doesnt exists',400))

    }
    user.password=newPassword;
    await user.save();
    user.password=undefined;
    res.status(200).json({
        success:true,
        message:'password changed successfully!'
    });
};
const updateUser=async(req,res)=>{
const {fullNmae}=req.body;
const {id}=req.user.id;
const user =await User.findById(id);
if(!user)
{
    return next(new AppError('user does not exists',400))
}
if(req.fullName)
{
    user.fullName=fullNmae;
}
if(req.file)
{
    await  cloudinaryv2.uploader.destroy(user.avatar.public_id);
    try{
        const result=cloudinary.v2.uploader.upload(req.file.path,{
       folder:'/WITHBACKEND/LMS/backend/uploads',
       width:250,     
       height:250,
       gravity:'faces',
       crop:'fill'
        });
        if(result)
        {

            user.avatar.public_id= result.public_id;
            user.avatar.secure_url= result.secure_url;
            fs.rm(`uploads/${req.file.filename}`)
        }
    }catch(e){
    return next(new AppError(error||'uploaded cancel',500));
        
    }
}
await user.save();
res.status(200).json({
    success:true,
    message:'User details updated successfully'
});
}
export{
    register,login,logout,getProfile,forgotpassword,resetpassword,changePassword
}  