export type UserLogin = {
  id: string;
  email: string;
  name: string;
};

export type LoginResponse = {
  access_token?: string;
  accessToken?: string;
  userLogin?: UserLogin;
  data?: {
    access_token?: string;
    accessToken?: string;
    userLogin?: UserLogin;
  };
};
