import app from './app.js';
import {config} from 'dotenv';
import cloudinary from 'cloudinary';
import connectionToDB from './config/dbConnection.js';
import Razorpay from 'razorpay';
config();
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
export const razorpay=new Razorpay({
    key_id:process.env.RAORPAY_KEY_ID,
    key_secret:process.env.RAORPAY_SECRET,
})
const PORT=process.env.PORT||5000;
app.listen(PORT,async ()=>{
     await connectionToDB();
console.log(`successfully listening at ${PORT}`);
});
