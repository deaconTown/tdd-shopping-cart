import { Catelog } from "../Entities/Catelog";

describe('Catelog', () => {
    let catalog: Catelog;

    beforeEach(() => {
        catalog = new Catelog();
    });

    it('should create a new catelog', () => {
        expect.assertions(1)
    });

    it('should get all catelogs', () => {
        expect.assertions(1)
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