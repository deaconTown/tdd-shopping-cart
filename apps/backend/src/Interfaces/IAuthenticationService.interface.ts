import { authLoginDTO } from "src/DTO/authLoginDTO";
import { Customer } from "src/Entities/Customer";

interface IAuthenticationService {
    ValidateLogin(login: authLoginDTO);
}

export default IAuthenticationService;

