import ICustomerService from "../Interfaces/ICustomerService.interface";
import { Customer } from "../Entities/Customer"
import CustomerService from "../Services/customer.service";
import { ShoppingCart } from "../Entities/ShoppingCart";
import { IShoppingCartService } from "src/Interfaces/IShoppingCart.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { ShoppingCartService } from "../Services/shoppingCart.service";
import { CartItem } from "src/Entities/CartItem";

describe('Customer', () => {
    let customer: Customer;
    let customerService: ICustomerService;
    let shoppingCartService: IShoppingCartService;

    beforeEach(async () => {
        customer = new Customer();
        customerService = new CustomerService();

        const module: TestingModule = await Test.createTestingModule({
            providers: [ShoppingCartService]
        }).compile();

        module.get<IShoppingCartService, ShoppingCartService>
    });

    it('should get all customers', () => {
        let newCustomers: Customer[] = [
            {
                id: 1,
                firstName: 'Jane',
                lastName: 'Doe',
                isActive: false,
                cartId: 1
            },
            {
                id: 2,
                firstName: 'Henry',
                lastName: 'Hill',
                isActive: false,
                cartId: 2
            }
        ]

        //act
        customerService.AddCustomer(newCustomers[0]);
        customerService.AddCustomer(newCustomers[1]);

        let result = customerService.GetCustomers();

        //assert
        expect(result.length).toEqual(2);
    });

    it('should add a new customer', () => {
        //arrange

        // let customerCart : ShoppingCart = {

        // }

        let newCustomer: Customer = {
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

    it('should get customer by id', () => {
        //arrange

        // let customerCart : ShoppingCart = {

        // }

        let newCustomer: Customer = {
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

    it('should make customer inActive', () => {
        //arrange
        let customer: Customer = {
            id: 1,
            firstName: 'Jane',
            lastName: 'Doe',
            isActive: true,
            cartId: 1
        }

        //act
        customerService.AddCustomer(customer);
        customerService.DeactivateCustomer(customer.id);

        let result = customerService.GetCustomerById(customer.id);

        //assert
        expect(result.isActive).toEqual(false);
    });

    it('should make customer active', () => {
        //arrange
        let customer: Customer = {
            id: 1,
            firstName: 'Jane',
            lastName: 'Doe',
            isActive: false,
            cartId: 1
        }

        //act
        customerService.AddCustomer(customer);
        customerService.ActivateCustomer(customer.id);

        let result = customerService.GetCustomerById(customer.id);

        //assert
        expect(result.isActive).toEqual(true);
    });


    // it('should create a new cart when a customer is created', () => {
    //     //arrange
    //     let customer: Customer = {
    //         id: 1,
    //         firstName: 'Jane',
    //         lastName: 'Doe',
    //         isActive: true,
    //         cartId: 1
    //     }

    //     var cartItems: CartItem[] = [];
    //     let newShoppingCart: ShoppingCart = {id: "id", customerId: customer.id, cartItems: cartItems, isActive: true}

    //     jest.spyOn(shoppingCartService, 'createShoppingCart').mockImplementation(() => newShoppingCart);
        
    //     //act
    //     customerService.AddCustomer(customer);
        
    //     // jest.spyOn(shoppingCartService, 'getShoppingCartByCustomerId').mockImplementation(() => newShoppingCart)

    //     // let result = .C(customer.id);

    //     //assert
    //     expect(shoppingCartService).toHaveBeenCalled();
    // });


    // it('should deactivate cart when a customer is deactivated', () => {
    //     expect.assertions(1)
    // });


})