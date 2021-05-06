export interface UserModelServer {
  type: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  id: string
}

export interface UserServerResponse {
  users: UserModelServer[];
}
