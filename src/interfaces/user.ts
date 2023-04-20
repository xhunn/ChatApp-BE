interface UserRegisterData {
  username: string;
  email: string;
  name: string;
  password: string;
}

interface UserLogin {
  username: string;
  password: string;
}

export { UserRegisterData, UserLogin }