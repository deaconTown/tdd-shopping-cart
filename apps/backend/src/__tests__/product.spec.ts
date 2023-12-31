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

    it('should check return true when product exists', () => {
        //arrange
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        //act
        productService.addProduct(product1);

        let result: boolean = productService.CheckExists(product1);

        //assert
        expect(result).toEqual(true);
    });

    it('should check return false when product exists', () => {
        //arrange
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        //act
        let result: boolean = productService.CheckExists(product1);

        //assert
        expect(result).toEqual(false);
    });

    // it('should not add product when it already exists', () => {
    //     const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    //     const product2: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    //     productService.addProduct(product1);
    //     productService.addProduct(product2);

    //     let prodList = productService.GetAllProducts();
    //     expect(prodList.length).toEqual(1);

    // });

    it('should throw an error when trying to add a duplicate product', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
        const product2: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        productService.addProduct(product1);

        const ex = () => productService.addProduct(product2);

        expect(ex).toThrow('Product already exists')
    });

    it('should return true if product is in stock', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        //act
        productService.addProduct(product1);

        let result: boolean = productService.CheckExists(product1);

        //assert
        expect(result).toEqual(true);

    });

    it('should return false if product is not in stock', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: false };

        //act
        productService.addProduct(product1);

        let result: boolean = productService.CheckExists(product1);

        //assert
        expect(result).toEqual(false);
    });

    it('should be out of stock when the product is inActive', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: false, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        //act
        productService.addProduct(product1);

        productService.CheckExists(product1);
        let result = productService.getProductById(product1.id);

        //assert

        expect(result.isInStock).toEqual(false);

    });

    it('should be out of stock when amountAvailable is 0', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 0, isInStock: true };

        //act
        productService.addProduct(product1);

        productService.CheckExists(product1);
        let result = productService.getProductById(product1.id);

        //assert
        expect(result.isInStock).toEqual(false);

    });

    it('should set product to out of stock', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        //act
        productService.addProduct(product1);

        productService.SetProductToOutOFStock(product1.id);
        let result = productService.getProductById(product1.id);

        //assert
        expect(result.isInStock).toEqual(false);
    });

    it('should set product to be in stock', () => {
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: false };

        //act
        productService.addProduct(product1);

        productService.SetProductToBeInStock(product1.id);
        let result = productService.getProductById(product1.id);

        //assert
        expect(result.isInStock).toEqual(true);
    });
});