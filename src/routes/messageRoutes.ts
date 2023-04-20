import express from 'express'
import { Request, Response, } from "express";
import { sendAPI } from './routesAPI';
import {
  postMessage,
  getMessage,
  getAllMessages,
} from '../controllers/messageController'
import { verify, decode } from '../auth';

const router = express.Router()

// POST MESSAGE
router.post('/message', verify, async (req: Request, res: Response) => {
    
  const payload = {
    content: req.body.content,
    from: req.body.from,
    to: req.body.to,
  }
  
  const data = await postMessage(payload)
  sendAPI(res, data)

});

// GET MESSAGE
router.get('/message/:messageId', async (req: Request, res: Response) => {
    
  const data = await getMessage(req.params.messageId)
  sendAPI(res, data)

});

// GET ALL MESSAGES
router.get('/messages/', verify, async (req: Request, res: Response) => { 

  if ( !req.headers.authorization ) return sendAPI(res, {
    message: "You are not authorized to view this page",
    status: 401,
  })
  const user = decode(req.headers.authorization!!);
  const data = await getAllMessages(user.data?.id)
  sendAPI(res, data)

});

export default router;