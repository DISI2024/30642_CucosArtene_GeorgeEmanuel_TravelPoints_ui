import {UserType} from "./UserType";

export class User {
  userId: number | undefined;
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  userType: UserType | undefined;
  createdAt: string | undefined;
}
