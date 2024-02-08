import { authLoginDTO } from "../DTO/authLogin.dto";
import { User } from "../Entities/User";
import IAuthenticationService from "../Interfaces/IAuthenticationService.interface";
import IUserService from "../Interfaces/IUserService.interface";
import { Injectable } from "@nestjs/common";
import UserService from "./user.service";

@Injectable()
class AuthenticationService implements IAuthenticationService {

    constructor(public userService: UserService) { }

    ValidateLogin(login: authLoginDTO) {

        console.log(`entered ValidateLogin method`);

        let loginValid = false;

        const user: User = this.userService.GetUserByEmail(login.email);

        if (user === null || user === undefined) {
            console.log(`No user found`);
            console.log(`exiting ValidateLogin method`);
            throw new Error('No user found')
        }


        if (user.isActive === false) {
            console.log(`user is inactive`);
            console.log(`exiting ValidateLogin method`);
            throw new Error('User inactive')
        }

        if (user.email && user.email.trim().toLowerCase() !== login.email.trim().toLowerCase()) {
            console.log(`no user found with email ${login.email}`);
            console.log(`exiting ValidateLogin method`);
            throw new Error(`no user found with email ${login.email}`)
        }

        // TODO: CREATE A METHOD TO HASH AND AND UNHASH WHEN NEEDED

        if (user.password && user.password.trim().toLowerCase() !== login.password.trim().toLowerCase()) {
            console.log(`exiting ValidateLogin method`);
            throw new Error(`user password did not match`)
        }

        console.log(`exiting ValidateLogin method`);
        return loginValid; //SEEMS LIKE DEAD CODE
    }

}

export default AuthenticationService;