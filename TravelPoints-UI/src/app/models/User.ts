import {UserType} from "./UserType";

export class User {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  userType: UserType | undefined;
  createdAt: string | undefined;
}
