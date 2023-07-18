import { Product } from "src/Entities/Product";

export interface IProductService {
    GetAllActiveProducts(): Product[];
    GetAllProducts(): Product[];
    addProduct(product: Product) : Product;
    getProductById(productId: number): Product;
}