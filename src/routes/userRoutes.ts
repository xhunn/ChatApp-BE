import express from 'express'
import { Request, Response, } from "express";
import { sendAPI } from './routesAPI';
import {
  register,
  login,
  getProfile,
  getAllProfiles
} from '../controllers/userController';
import { verify, decode } from '../auth';

const router = express.Router()

// REGISTER
router.post('/register', async (req: Request, res: Response) => {
  
  const payload = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  }
  
  const data = await register(payload)
  sendAPI(res, data)

});

// LOGIN
router.post('/login', async (req: Request, res: Response) => {
    
  const payload = {
    username: req.body.username,
    password: req.body.password,
  }
  
  const data = await login(payload)
  sendAPI(res, data)

});

// VERIFY
router.post('/verify', verify, async (req: Request, res: Response) => {
  const payload = decode(req.headers.authorization!!)
  const data = await getProfile(payload.data.username)
  sendAPI(res, data)
})
  

// GET PROFILE
router.post('/profile', async (req: Request, res: Response) => {
    
  const data = await getProfile(req.body.username)
  sendAPI(res, data)

});

// GET ALL PROFILES
router.get('/profiles', async (req: Request, res: Response) => {
      
  const data = await getAllProfiles()
  sendAPI(res, data)

});

export default router;