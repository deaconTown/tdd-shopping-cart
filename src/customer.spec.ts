import { Customer } from "./Entities/Customer"

describe('Customer', () => {
    let customer: Customer;

    beforeEach(() => {
        customer = new Customer();
    });

    it('should add a new customer', () => {
        expect.assertions(1)
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