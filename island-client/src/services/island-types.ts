export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
}
export interface Island {
  name: string;
  description: string;
  provence: string;
  user: User;
  image: string;
}
export interface RawIsland {
  name: string;
  description: string;
  provence: string;
  user: User;
  image: string;

}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;

}
