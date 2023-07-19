import { CatelogItem } from "src/Entities/CatelogItem";
import { Catelog } from "../Entities/Catelog";
import { ICatelogService } from "../Interfaces/ICatelogService.interface";
import { CatelogService } from "../Services/catelog.service";

describe('Catelog', () => {
    let catalog: Catelog;
    let catalogService: ICatelogService;

    beforeEach(() => {
        catalog = new Catelog();
        catalogService = new CatelogService();
    });

    it('should create a new catelog', () => {
        const catelogItemList: CatelogItem[] = [{id: 1, productId: 1, qty: 2}]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items:catelogItemList };

        let result = catalogService.addCatelog(catelog1);

        expect(result.name).toEqual(catelog1.name);

    });

    it('should get all catelogs', () => {
        const catelogItemList: CatelogItem[] = [{id: 1, productId: 1, qty: 2}]
        const catelog1: Catelog = { id: 1, name: 'electronics', isActive: true, category: "", items:catelogItemList };

        const catelog2: Catelog = { id: 2, name: 'electronics2', isActive: true, category: "", items:catelogItemList };

        let result = catalogService.GetCatelogs();

        expect(result.length).toEqual(2);

    });


    //	but if the catalog had 6 then it should increase by such
    it('should get all items from a catalog', () => {
        expect.assertions(1)
    });


    it('should return true if catelog exists', () => {
        //checking by name not id
        expect.assertions(1)
    });

    it('should return false if catelog does not exists', () => {
        //checking by name not id
        expect.assertions(1)
    });

    it('should return only active catelogs', () => {
        expect.assertions(1)
    });

    it('should get catelog by id', () => {
        expect.assertions(1)
    });

    it('should make catelog inActive', () => {
        expect.assertions(1)
    });

    it('should make catelog active', () => {
        expect.assertions(1)
    });

    it('should add a product in the catelog', () => {
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

    it('should add all items in the catelog to the cart', () => {
        expect.assertions(1)
    });

});