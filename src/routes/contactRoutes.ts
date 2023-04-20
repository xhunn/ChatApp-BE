import express from 'express'
import { Request, Response, } from "express";
import { sendAPI } from './routesAPI';
import { verify, decode } from '../auth';
import {

  postContact,
  updateContact,
  getContact,
  getAllContacts

} from '../controllers/contactsController'

const router = express.Router()

// POST CONTACT
router.post('/contact', verify, async (req: Request, res: Response) => {
      
  const payload = {
    name: req.body.name,
    participants: req.body.participants,
  }
  
  const data = await postContact(payload)
  sendAPI(res, data)
  
});

// UPDATE CONTACT
router.put('/contact/', verify, async (req: Request, res: Response) => {
  
  const user = decode(req.headers.authorization!!)
  const payload = {
    id: user.data?.id,
    name: req.body.name,
    messages: req.body.messages,
  }
  
  const data = await updateContact(payload)
  sendAPI(res, data)
    
});

// GET CONTACT
router.get('/contact/:contactId', verify, async (req: Request, res: Response) => {
  
  const data = await getContact(req.params.contactId)
  sendAPI(res, data)
  
});

// GET ALL CONTACTS
router.get('/contacts/', verify, async (req: Request, res: Response) => {
    
  const user = decode(req.headers.authorization!!)
  const data = await getAllContacts(user.data?.id)
  sendAPI(res, data)
    
});

export default router;