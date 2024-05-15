<<<<<<< HEAD
import express from 'express';
import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
=======
import express from "express";
import {UpdateProfile, verifyUser} from "../controllers/user.controller.js";
>>>>>>> parent of 9eb9d6b (initial commit)


<<<<<<< HEAD
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
=======
router.get('/')
router.post('/update/:id',verifyUser, UpdateProfile)
>>>>>>> parent of 9eb9d6b (initial commit)

export default router;