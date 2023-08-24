import ICustomerService from "src/Interfaces/ICustomerService.interface";
import { Customer } from "../Entities/Customer"
import CustomerService from "../Services/customer.service";
import { ShoppingCart } from "src/Entities/ShoppingCart";

describe('Customer', () => {
    let customer: Customer;
    let customerService: ICustomerService;

    beforeEach(() => {
        customer = new Customer();
        customerService = new CustomerService();
    });

    it('should add a new customer', () => {
        //arrange

        // let customerCart : ShoppingCart = {

        // }

        let newCustomer : Customer = {
            id: 1,
            firstName: 'Jane',
            lastName: 'Doe',
            isActive: false,
            cartId: 1
        }

        //act
        customerService.AddCustomer(newCustomer);

        let result = customerService.GetCustomerById(newCustomer.id);

        //assert
        expect(result.firstName).toEqual('Jane')
    });

    it('should create a new cart when a customer is created', () => {
        expect.assertions(1)
    });

    it('should make customer inActive', () => {
        expect.assertions(1)
    });

    it('should make customer active', () => {
        expect.assertions(1)
    });

    
})