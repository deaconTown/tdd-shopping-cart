import { Customer } from "src/Entities/Customer";

interface ICustomerService {
    GetCustomers();
    GetCustomerById(customerId: number);
    AddCustomer(customer: Customer);
    ActivateCustomer(customerId: number);
    DeactivateCustomer(customerId: number);
}

export default ICustomerService;

