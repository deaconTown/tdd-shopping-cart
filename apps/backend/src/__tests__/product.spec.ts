import { Product } from "../Entities/Product";
import { ProductService } from "../Services/product.service";

describe('ProductService', () => {
    let product: Product;
    let productService: ProductService;

    beforeEach(() => {
        product = new Product();
        productService = new ProductService();
    });

    it('should create a new product', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        let result = productService.addProduct(product1);

        expect(result.name).toEqual(product1.name);
    });

    it('should get all products', () => {
        expect.assertions(1)
    });

    it('should get a product by id', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
        const product2: Product = { id: 2, name: 'blue shoes', isActive: true, unitPrice: 15.00, amountAvailable: 4, isInStock: true };

        productService.addProduct(product1);
        productService.addProduct(product2);

        let result = productService.getProductById(product2.id);

        expect(result.name).toEqual(product2.name);
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