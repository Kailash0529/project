import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllcourses, getLectureByCourseId, removeCourse, updateCourse } from "../controllers/course.controller";
import { authorizedRoles, authorizedSubscribers, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from '../middleware/multer.middleware.js'
const router =Router();
router.route('/').get(getAllcourses)
.post(isLoggedIn,authorizedRoles('ADMIN'),
upload.single('thumbnail'),createCourse);
router.route('/:id')
.get(isLoggedIn,authorizedSubscribers, getLectureByCourseId)
 .put(isLoggedIn,authorizedRoles('ADMIN'),updateCourse)
 .delete(isLoggedIn,authorizedRoles('ADMIN'),removeCourse)
 .post(isLoggedIn,authorizedRoles('ADMIN'),upload.single('lecture'),addLectureToCourseById);
export default router;
