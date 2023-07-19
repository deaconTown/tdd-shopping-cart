export default class ProductException extends Error {
    /**
     *
     */
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ProductException.prototype);
    }

    ProductAlreadyExists() {
        return this.message;
    }

}