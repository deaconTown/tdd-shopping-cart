import { Customer } from "src/Entities/Customer";

interface ICustomerService {
    GetCustomers() : Customer[];
    GetCustomerById(customerId: number) : Customer;
    AddCustomer(customer: Customer) : Customer;
    ActivateCustomer(customerId: number);
    DeactivateCustomer(customerId: number);
}

export default ICustomerService;

