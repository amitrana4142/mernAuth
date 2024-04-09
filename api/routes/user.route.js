import express from "express";
import {UpdateProfile, verifyUser} from "../controllers/user.controller.js";

const  router = express.Router();

router.get('/')
router.post('/update/:id',verifyUser, UpdateProfile)

export default router;