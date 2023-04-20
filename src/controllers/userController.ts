import User from "../models/user";
import bcrypt from "bcrypt";
import { createToken } from "../auth";
import { UserRegisterData, UserLogin } from "../interfaces/user";

const register = (data: UserRegisterData) => {
  return User.findOne({ username: data.username }).then((user) => {

    if (!user) return bcrypt.hash(data.password, 10).then((hash) => {

      const newUser = new User({
        username: data.username,
        email: data.email,
        name: data.name,
        password: hash,
      });

      return newUser.save().then(user => {
          
        return {
          message: "User created successfully",
          status: 201,
          token: createToken(user),
        }
        
      }).catch(err => {

        return {
          message: `Something went wrong:\n${err}`,
          status: 500,
        }

      });

    });
    
    else throw new Error("exist");
    

  }).catch(err => {
    
    if (err.message === "exist") return {
      message: "User already exists",
      status: 409,
    }

    else return {
      message: `Something went wrong\n${err}`,
      status: 500,
    }

  });

}

const login = (credentials: UserLogin) => {

  return User.findOne({ username: credentials.username }).then((user) => {

    if (user) return bcrypt.compare(credentials.password, user.password).then((result) => {

      if (result) return {
        message: "Logged in successfully",
        status: 200,
        token: createToken(user),
      };

      else return {
        message: "Invalid credentials",
        status: 401,
      }

    });

    else return {
      message: "User not found",
      status: 404,
    }

  }).catch(err => {

    return {
      message: `Something went wrong:\n${err}`,
      status: 500,
    }

  });
}

const getProfile = (username: string) => {

  return User.findOne({ username }).then(user => {

    if (user) return {
      message: "Profile found",
      status: 200,
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
        contacts: user.contacts,
      }
    };

    else return {
      message: "User not found",
      status: 404,
    }

  }).catch(err => {

    return {
      message: `Something went wrong:\n${err}`,
      status: 500,
    }

  });
}

const getAllProfiles = () => {
  
  return User.find({}).then(users => {
  
      if (users) return {
        message: "Users found",
        status: 200,
        users: users.map(user => ({
          username: user.username,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isOnline: user.isOnline,
          contacts: user.contacts,
        }))
      };
  
      else return {
        message: "No users found",
        status: 404,
      }
  
    }).catch(err => {
  
      return {
        message: `Something went wrong:\n${err}`,
        status: 500,
      }
  
    });
  
}

export { register, login, getProfile, getAllProfiles }