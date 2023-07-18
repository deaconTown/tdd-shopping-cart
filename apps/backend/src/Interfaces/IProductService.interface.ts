import { Product } from "src/Entities/Product";

export interface IProductService {
    addProduct(product: Product) : Product;
    getProductById(productId: number): Product;
    GetAllProducts(): Product[];
    GetAllActiveProducts(): Product[];
    ActivateProduct(product: Product): Product;
}