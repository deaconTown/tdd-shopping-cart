import { Customer } from "src/Entities/Customer";
import IAuthenticationService from "src/Interfaces/IAuthenticationService.interface";

class AuthenticationService implements IAuthenticationService {

    ValidateLogin(username: string, password: string) {
        throw new Error("Method not implemented.");
    }

}

export default AuthenticationService;