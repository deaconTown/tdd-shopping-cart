import { Customer } from "src/Entities/Customer";

interface IAuthenticationService {
    ValidateLogin(username:string, password: string);
}

export default IAuthenticationService;

