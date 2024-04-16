import express from 'express'
import { signin, signup,google, signOut } from '../controllers/auth.controller.js';


const route= express.Router();

route.post('/sign-up', signup)
route.post('/sign-in',signin)
route.post('/google',google)
route.get('/sign-out',signOut)

export default route;