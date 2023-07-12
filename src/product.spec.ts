import { Product } from "./Entities/Product";

describe('Products', () => {
    let product: Product;

    beforeEach(() => {
        product = new Product();
    });

    it('should create a new product', () => {
        expect.assertions(1)
    });

    it('should get all products', () => {
        expect.assertions(1)
    });

    it('should get a product by id', () => {
        expect.assertions(1)
    });

    it('should make a product inActive', () => {
        expect.assertions(1)
    });

    it('should make a product active', () => {
        expect.assertions(1)
    });

    it('should return only active products', () => {
        expect.assertions(1)
    });

    it('should check if product exists', () => {
        expect.assertions(1)
    });

    it('should not add product when it already exists', () => {
        expect.assertions(1);
    });

    it('should return true if product is in stock', () => {
        expect.assertions(1)
    });

    it('should return false if product is not in stock', () => {
        expect.assertions(1)
    });

    it('should should be out of stock when it is inActive', () => {
        expect.assertions(1)
    });

    it('should should be out of stock when amountAvailable is 0', () => {
        expect.assertions(1)
    });
});