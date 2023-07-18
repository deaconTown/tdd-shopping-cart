import { IProductService } from "src/Interfaces/IProductService.interface";
import { Product } from "../Entities/Product";
import { ProductService } from "../Services/product.service";

describe('ProductService', () => {
    let product: Product;
    let productService: IProductService;

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

        let product1: Product = { id: 1, name: 'red shoe', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
        let product2: Product = { id: 2, name: 'blue cup', isActive: true, unitPrice: 220.00, amountAvailable: 5, isInStock: true };

        productService.addProduct(product1);
        productService.addProduct(product2);

        let prodList = productService.GetAllProducts();
        expect(prodList.length).toEqual(2);
    });

    it('should get a product by id', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
        const product2: Product = { id: 2, name: 'blue shoes', isActive: true, unitPrice: 15.00, amountAvailable: 4, isInStock: true };

        productService.addProduct(product1);
        productService.addProduct(product2);

        let result = productService.getProductById(product2.id);

        expect(result.name).toEqual(product2.name);
    });

    it('should return only active products', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: false, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
        const product2: Product = { id: 2, name: 'blue shoes', isActive: true, unitPrice: 15.00, amountAvailable: 4, isInStock: true };

        productService.addProduct(product1);
        productService.addProduct(product2);

        let result = productService.GetAllActiveProducts();

        expect(result.length).toEqual(1);
    });

    it('should make a product active', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: false, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        productService.addProduct(product1);

        let result: Product = productService.ActivateProduct(product1);

        expect(result.isActive).toEqual(true);
    });

    it('should make a product inActive', () => {

        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        productService.addProduct(product1);

        let result: Product = productService.DeactivateProduct(product1);

        expect(result.isActive).toEqual(false);
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