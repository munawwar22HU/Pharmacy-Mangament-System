export interface UserModelServer {
  type: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  id: string;
  userImage: string;
}

export interface UserServerResponse {
  users: UserModelServer[];
}

export interface UserResponse{
  status: BigInteger;
  user: UserModelServer
}
