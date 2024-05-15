import express from "express";
import {UpdateProfile, verifyUser,deleteProfile} from "../controllers/user.controller.js";

const  router = express.Router();

router.get('/')
router.post('/update/:id',verifyUser, UpdateProfile)
router.delete('/delete/:id',verifyUser, deleteProfile)

export default router;