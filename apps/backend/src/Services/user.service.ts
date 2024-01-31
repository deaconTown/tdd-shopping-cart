import { User } from "src/Entities/User";
import IUserService from "src/Interfaces/IUserService.interface";

class UserService implements IUserService {
    private users: User[] = [];
    
    GetUsers() : User[] {
        return this.users;
    }

    GetUserById(userId: number): User {
        
        return this.users.find(x => x.id == userId);
    }

    AddUser(user: User) {
        this.users.push(user);

        return user;
    }

    ActivateUser(userId: number) {
        var user: User = this.GetUserById(userId);

        user.isActive = true;

        //find the index of the user to update
        let foundIndex = this.users.findIndex(x => x.id == userId);

        //update the user based on the index found
        this.users[foundIndex] = user;
    }

    DeactivateUser(userId: number) {
        var user: User = this.GetUserById(userId);

        user.isActive = false;

        //find the index of the user to update
        let foundIndex = this.users.findIndex(x => x.id == userId);

        //update the user based on the index found
        this.users[foundIndex] = user;
    }
    
}

export default UserService;