import { Customer } from "src/Entities/Customer";
import ICustomerService from "src/Interfaces/ICustomerService.interface";

class CustomerService implements ICustomerService {
    private customers: Customer[] = [];
    
    GetCustomers() : Customer[] {
        return this.customers;
    }

    GetCustomerById(customerId: number): Customer {
        
        return this.customers.find(x => x.id == customerId);
    }

    AddCustomer(customer: Customer) {
        this.customers.push(customer);

        return customer;
    }

    ActivateCustomer(customerId: number) {
        var customer: Customer = this.GetCustomerById(customerId);

        customer.isActive = true;

        //find the index of the customer to update
        let foundIndex = this.customers.findIndex(x => x.id == customerId);

        //update the customer based on the index found
        this.customers[foundIndex] = customer;
    }

    DeactivateCustomer(customerId: number) {
        var customer: Customer = this.GetCustomerById(customerId);

        customer.isActive = false;

        //find the index of the customer to update
        let foundIndex = this.customers.findIndex(x => x.id == customerId);

        //update the customer based on the index found
        this.customers[foundIndex] = customer;
    }
    
}

export default CustomerService;