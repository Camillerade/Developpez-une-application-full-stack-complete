import { User } from "./user.interface";

export interface AuthSuccess {
    token: string;
    user: User; // Assure-toi que le champ user est de type User
  }
  