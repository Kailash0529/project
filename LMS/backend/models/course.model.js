import { Model,Schema } from "mongoose";
const courseSchema=new Schema({
  title:{
type:String,
required:[true,'title is require'],
minLength:[8,'must be atleast 8 characters'],
maxLength:[59,'should be less than 60  characters'],
trim:true,
  },
  description:{
    type:String,
    required:[true,'title is require'],
minLength:[8,'must be atleast 8 characters'],
maxLength:[199,'should be less than 200  characters'],
  },
  category:{
    type:String,
    required:[true,'title is require'],

  },
  thumbnail:{
public_id:{
    type:String
},
secure_url:{
    type:String
}
  },
  lectures:[{
  titile:String,
  description:String,
  lecture:{
    public_id:{
      type:String,
      required:true
    },
    secure_url:{
      type:String,
      required:true
    }
  }
    }],
    numberOfLectures:{
      type:Number,

      default:0,
    },
    createdBy:{
      type:String,
      required:true,
    },
    
},{
  timestamps:true
});

const Course=Model('course',courseSchema);
export default Course;