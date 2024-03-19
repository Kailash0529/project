import Course from "../models/course.model.js"
import cloudinary from 'cloudinary'
import AppError from "../utils/error.util.js";
import fs from 'fs/promises';
const getAllcourses=async function (req,res,next){
try{
    const courses=await Course.find({}).select('-lectures');
res.status(200).json({
    success:true,
    message:'All courses',
    courses,
});
}catch(e)
{
    return next(new AppError(e.message,500))
}
}
const getLectureByCourseId=async function(req,res,next){
try{
  const {id}=req.params;
  const course=await Course.findById(id);
  if(!course)
  {
    return next(new AppError('invalid course id',400));
    
  }
  res.status(200).json({
    success:true,
    message:'course lectures fetched successfully',
    lectures:course.lectures
  });
}catch(e){
    return next(new AppError(e.message,500))

}
}
const createCourse=async function(req,res,next)
{
  const {title,description,category,createdBy}=req.body;
  if(!title||!description||!category||!createdBy)
  {
    return next(new AppError('All fields are required',400));
  }
  const course=await Course.create({
    title,description,category,createdBy,
    thumbnail:{
public_id:'dummy',
secure_url:'dummy',
    },
  });
  if(!course)
  {
    return next(new AppError('course could not created try later',500))
  }
  if(req.file)
  {
   try{
    const result=await cloudinary.v2.uploader.upload(req.file.path,{
      folder:'lms'
    });
    if(result)
    {
      course.thumbnail.public_id=result.public_id;
      course.thumbnail.secure_url=result.secure_url;
    }

    fs.rm(`uploads/${req.file.filename}`);
   }catch(e)
   {
    return next(new AppError(e.message,500))
   }
  }
  await course.save();
  res.status(200).json({
    success:true,
    message:'course created successfully',
    course,
  });
}
const updateCourse=async function(req,res,next)
{
try{
const {id}=req.params;
const course=await Course.findByIdAndUpdate(
  id,{
    $set:req.body
  },
  {
    runValidators:true
  }
);
if(!course)
{
  return next(new AppError('course doesnt exists',500))

}
res.status(200).json({
  success:true,
  message:'course updated successfully',
  course
});
}catch(e){
  return next(new AppError(e.message,500))
  
}
}
const removeCourse=async function(req,res,next)
{
  try{
    const {id}=req.params;
  const course=await Course.findById(id);
  if(!course)
  {
  return next(new AppError('course with given id not found',500))
    
  }
  await Course.findByIdAndDelete(id);
  res.status(200).json({
    success:true,
    message:'course deleted successfully',
    course
  });
  }catch(e){
    return next(new AppError('e.message',500))

  }

}
const addLectureToCourseById=async (req,res,next)=>
{
try{
  const {title,description}=req.body;
  const {id}=req.params;
  if(!title||!description)
  {
    return next(new AppError('All fields are required',400))
  }
  const course=await Course.findById(id);
  if(!course)
  {
    return next(new AppError('course with given id not found',500))
  
  }
  const lectureData={
    title,description,lecture:{},
  };
  if(req.file)
    {
     try{
      const result=await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'lms',
      });
      if(result)
      {
        lectureData.lecture.public_id=result.public_id;
        lectureData.lecture.secure_url=result.secure_url;
      }
  
      fs.rm(`uploads/${req.file.filename}`);
     }catch(e)
     {
      return next(new AppError(e.message,500))
     }
    }
    course.lectures.push(lectureData);
  course.numbersOfLectures=course.lectures.length;
  await course.save();
  res.status(200).json({
    success:true,
    message:'Lectures successfully added to the course',
    course,
  });
}catch(e){
  return next(new AppError('e.message',500))

}


};
export{
    getAllcourses,getLectureByCourseId,createCourse,updateCourse,removeCourse,addLectureToCourseById
}