import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

const isLoggedIn= async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new AppError('authentification failed ligin again',401));
    }
    const userDetails= await jwt.verify(token,process.env.JWT_SECRET);
    req.user=userDetails;
    next();

}
const authorizedRoles=(...roles)=>async (req,res,next)=>{
    const currentUserRole=req.user.role;
    if(!roles.includes(currentUserRole)){
  return next(new AppError('you dont have permission to access this course',401))

    }
    next();
}
const authorizedSubscribers=async(req,res,next)=>{
const subscription=req.user.subscription;

const currUserRole=req.user.role;
if(currUserRole!=='Admin'&&subscription.status!=='active')
{
  return next(new AppError('Please subscribe to access this details',403))

}
next();
};
export{
    isLoggedIn,authorizedRoles,authorizedSubscribers
}