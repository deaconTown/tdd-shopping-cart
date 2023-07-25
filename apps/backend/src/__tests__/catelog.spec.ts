import { CatelogItem } from "src/Entities/CatelogItem";
import { Catelog } from "../Entities/Catelog";
import { ICatelogService } from "../Interfaces/ICatelogService.interface";
import { CatelogService } from "../Services/catelog.service";
import { Product } from "src/Entities/Product";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../Services/product.service";
import { IProductService } from "../Interfaces/IProductService.interface";

describe('Catelog', () => {
    let catalog: Catelog;
    let catalogService: ICatelogService;
    let productService: IProductService;

    beforeEach(async () => {
        catalog = new Catelog();

        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService]
        }).compile();

        productService = module.get<IProductService>(ProductService);
        catalogService = new CatelogService(productService);
    });

    it('should create a new catelog', () => {
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };

        let result = catalogService.addCatelog(catelog1);

        expect(result.name).toEqual(catelog1.name);

    });

    it('should get all catelogs', () => {
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };

        const catelog2: Catelog = { id: 2, name: 'electronics2', isActive: true, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);
        catalogService.addCatelog(catelog2);

        let result = catalogService.GetCatelogs();

        expect(result.length).toEqual(2);

    });

    it('should get catelog by id', () => {
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };

        const catelog2: Catelog = { id: 2, name: 'clothes', isActive: true, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);
        catalogService.addCatelog(catelog2);

        let result: Catelog = catalogService.GetCatelogById(catelog2.id);

        expect(result.name).toEqual('clothes');

    });


    it('should get all products from a catalog', () => {
        //arrange
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
        const product2: Product = { id: 2, name: 'blue shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

        // productService.addProduct(product1);
        // productService.addProduct(product2);

        jest.spyOn(productService, 'addProduct')
            .mockImplementationOnce(() => product1)
            .mockImplementationOnce(() => product2)

        const catelogItemList: CatelogItem[] = [{ id: 1, productId: product1.id, qty: 2 }, { id: 1, productId: product2.id, qty: 1 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        jest.spyOn(productService, 'getProductById')
            .mockImplementationOnce(() => product1)
            .mockImplementationOnce(() => product2)

        //act
        let result: Product[] = catalogService.GetProductsByCatalogId(catelog1.id);

        //assert
        expect(result.length).toEqual(2);
    });


    it('should return true if catelog exists', () => {
        //checking by name not id
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };


        catalogService.addCatelog(catelog1);

        let result: boolean = catalogService.CheckIfCatelogExists(catelog1.id);

        expect(result).toEqual(true);
    });

    it('should return false if catelog does not exists', () => {
        //checking by name not id
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };


        // catalogService.addCatelog(catelog1);

        let result: boolean = catalogService.CheckIfCatelogExists(catelog1.id);

        expect(result).toEqual(false);
    });

    it('should return only active catelogs', () => {
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: false, category: "", items: catelogItemList };

        const catelog2: Catelog = { id: 2, name: 'electronics2', isActive: true, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);
        catalogService.addCatelog(catelog2);

        let result: Catelog[] = catalogService.GetAllActiveCatelogs();

        expect(result.length).toEqual(1);
    });

    it('should make catelog inActive', () => {
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        let result: Catelog = catalogService.DeactivateCatelog(catelog1.id);

        expect(result.isActive).toEqual(false);

    });

    it('should make catelog active', () => {
        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 1, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: false, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        let result: Catelog = catalogService.ActivateCatelog(catelog1.id);

        expect(result.isActive).toEqual(true);
    });

    it('should add a product to the catelog', () => {
        //arrange
        const product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 11, isInStock: true };

        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 100, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: false, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        jest.spyOn(productService, 'getProductById')
            .mockImplementationOnce(() => product1)

        //act
        let result: Catelog = catalogService.AddProductionToCatelog(catelog1.id, product1, 5);

        let actualResult = result.items.find(x => x.productId == 1);

        //assert
        expect(actualResult.productId).toEqual(product1.id);
    });

    it('should not add product if it is already exists in the catelog', () => {
        //arrange
        const product1: Product = { id: 100, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 11, isInStock: true };

        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 100, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: false, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        jest.spyOn(productService, 'getProductById')
            .mockImplementationOnce(() => product1)

        //act
        let result: Catelog = catalogService.AddProductionToCatelog(catelog1.id, product1, 5);

        //assert
        expect(result.items.length).toEqual(1);

    });

    it('should not add inactive product to the catelog', () => {
        //arrange
        const product1: Product = { id: 100, name: 'red shoes', isActive: false, unitPrice: 10.00, amountAvailable: 11, isInStock: true };

        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 200, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: false, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        jest.spyOn(productService, 'getProductById')
            .mockImplementationOnce(() => product1)

        //act
        let result: Catelog = catalogService.AddProductionToCatelog(catelog1.id, product1, 5);

        //assert
        expect(result.items.length).toEqual(1);

    });

    it('should not add product when not in stock to the catelog', () => {
        //arrange
        const product1: Product = { id: 100, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 11, isInStock: false };

        const catelogItemList: CatelogItem[] = [{ id: 1, productId: 200, qty: 2 }]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: false, category: "", items: catelogItemList };

        catalogService.addCatelog(catelog1);

        jest.spyOn(productService, 'getProductById')
            .mockImplementationOnce(() => product1)

        //act
        let result: Catelog = catalogService.AddProductionToCatelog(catelog1.id, product1, 5);

        //assert
        expect(result.items.length).toEqual(1);

    });

    it('should not add product when qty required exceeds the product available amount to the catelog', () => {
        expect.assertions(1)
    });

    it('should update a specific product in the catelog', () => {
        expect.assertions(1)
    });

    it('should remove a specific product from the catelog', () => {
        expect.assertions(1)
    });

    it('should make catelog inActive when a product becomes inActive', () => {
        expect.assertions(1)
    });

    it('should make catelog inActive when a product availableAmount is zero', () => {
        expect.assertions(1)
    });

    // select from a catalog of products or item
    it('should add specific product from calelog to cart', () => {
        expect.assertions(1)
    });

    //	but if the catalog had 6 then it should increase by such
    it('should add all items in the catelog to the cart', () => {
        expect.assertions(1)
    });

});