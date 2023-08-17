import { Customer } from "src/Entities/Customer";
import ICustomerService from "src/Interfaces/ICustomerService.interface";

class CustomerService implements ICustomerService {
    private customers: Customer[] = [];
    
    GetCustomers() {
        throw new Error("Method not implemented.");
    }
    GetCustomerById(customerId: number) {
        throw new Error("Method not implemented.");
    }

    AddCustomer(customer: Customer) {
        throw new Error("Method not implemented.");
    }
    ActivateCustomer(customerId: number) {
        throw new Error("Method not implemented.");
    }
    DeactivateCustomer(customerId: number) {
        throw new Error("Method not implemented.");
    }
    
}

export default CustomerService;