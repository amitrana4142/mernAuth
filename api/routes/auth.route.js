<<<<<<< HEAD
import express from 'express';
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';
=======
import express from 'express'
import { signin, signup,google } from '../controllers/auth.controller.js';
>>>>>>> parent of 9eb9d6b (initial commit)

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut)

<<<<<<< HEAD
export default router;
=======
route.post('/sign-up', signup)
route.post('/sign-in',signin)
route.post('/google',google)

export default route;
>>>>>>> parent of 9eb9d6b (initial commit)
