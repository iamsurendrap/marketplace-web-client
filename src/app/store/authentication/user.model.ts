export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  isActive: boolean;
  isAdmin: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}