import { User } from "src/Entities/User";

interface IUserService {
    GetUsers() : User[];
    GetUserById(userId: number) : User;
    AddUser(user: User) : User;
    ActivateUser(userId: number);
    DeactivateUser(userId: number);
}

export default IUserService;

