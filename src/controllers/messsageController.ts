import Message from "../models/message";
import {
  PostMessageData
} from "../interfaces/message";

const postMessage = async ( data: PostMessageData ) => {
  
  return new Message({

    content: data.content,
    from: data.from,
    to: data.to,

  }).save().then((message) => {
    
    return {
      message: "Message sent successfully",
      status: 200,
      content: message,
    }
    
  }).catch(err => {
    
    return {
      message: `Something went wrong:\n${err}`,
      status: 500,
    }
    
  });

}

const getMessage = async ( messageId: string ) => {
  
  return Message.findById(messageId).then((message) => {

    if (message) return {
      message: "Message found",
      status: 200,
      content: message,
    }
    
    else return {
      message: "Message not found",
      status: 404,
    }
    
  }).catch(err => {
    
    return {
      message: `Something went wrong\n${err}`,
      status: 500,
    }
    
  });
}

const getAllMessages = async ( userId: string ) => {
  
  return Message.find({ from: userId }).then((messages) => {
    
    if (messages) return {
      message: "Messages found",
      status: 200,
      content: messages,
    }
    
    else return {
      message: "Messages not found",
      status: 404,
    }
    
  }).catch(err => {
    
    return {
      message: `Something went wrong\n${err}`,
      status: 500,
    }
    
  });
  
}


export { postMessage, getMessage, getAllMessages }