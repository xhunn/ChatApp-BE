import Contact from "../models/contact";
import {
  PostContactData,
  UpdateContactData,
} from "../interfaces/contact";

const postContact = async ( data: PostContactData ) => {
  
  return Contact.findOne({ participants: data.participants }).then((contact) => {
    
    if (!contact) return new Contact({
      
      name: data.name,
      participants: data.participants,

    }).save().catch(err => {
      
      return {
        message: `Something went wrong:\n${err}`,
        status: 500,
      }
      
    });

    else return {
      message: "Contact already exists",
      status: 409,
      contactId: contact._id,
    }
      
  }).catch(err => {
      
    return {
      message: `Something went wrong\n${err}`,
      status: 500,
    }
    
  });

}

const updateContact = async ( data: UpdateContactData ) => {
  
  return Contact.findById(data.id).then((contact) => {

    if (contact) {

      if (data.name) contact.name = data.name;
      if (data.messages) contact.messages = data.messages;

      return Contact.findByIdAndUpdate(data.id, contact).then(() => {
          
        return {
          message: "Contact updated successfully",
          status: 200,
        }
        
      }).catch(err => new Error(err));

    } else return {

      message: "Contact not found",
      status: 404,

    }
      
  }).catch(err => {
      
    return {
      message: `Something went wrong\n${err}`,
      status: 500,
    }
    
  });

}

const getContact = async (contactId: string) => {
  return Contact.findById(contactId).then((contact) => {

    if (contact) return {
      message: "Contact found",
      status: 200,
      contact,
    }
    else return {
      message: "Contact not found",
      status: 404,
    }

  }).catch(err => {

    return {
      message: `Something went wrong\n${err}`,
      status: 500,
    }

  });
}

const getAllContacts = async ( userId: string ) => {
  
    return Contact.find({ participants: userId }).then((contacts) => {
  
      if (contacts) return {
        message: "Contacts found",
        status: 200,
        contacts,
      }
  
      else return {
        message: "No contacts found",
        status: 404,
      }
  
    }).catch(err => {
  
      return {
        message: `Something went wrong\n${err}`,
        status: 500,
      }
  
    });
  
}


export { postContact, updateContact, getAllContacts, getContact }