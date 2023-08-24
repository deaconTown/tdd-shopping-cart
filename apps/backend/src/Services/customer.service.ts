import { Customer } from "src/Entities/Customer";
import ICustomerService from "src/Interfaces/ICustomerService.interface";

class CustomerService implements ICustomerService {
    private customers: Customer[] = [];
    
    GetCustomers() : Customer[] {
        throw new Error("Method not implemented.");
    }
    GetCustomerById(customerId: number): Customer {
        
        return this.customers.find(x => x.id == customerId);
    }

    AddCustomer(customer: Customer) {
        this.customers.push(customer);

        return customer;
    }
    ActivateCustomer(customerId: number) {
        throw new Error("Method not implemented.");
    }
    DeactivateCustomer(customerId: number) {
        throw new Error("Method not implemented.");
    }
    
}

export default CustomerService;