import express from 'express';
import { signin, signup } from '../controllers/auth-controllers.js';
import { addJobs, getJobs, getUserData, updateUserData, verifyJWT } from '../controllers/job-controllers.js';

export const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/add-job").post(verifyJWT, addJobs)
router.route("/get-jobs").get(getJobs)
router.route('/get-user-data').post(getUserData)
router.route("/update-user").post(updateUserData)