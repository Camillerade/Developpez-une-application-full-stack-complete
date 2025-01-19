export interface User {

  id: number;

  email: string;

  username: string;

  admin: boolean;

  password?: string; // Add the password property

  createdAt: Date;

  updatedAt: Date;

}