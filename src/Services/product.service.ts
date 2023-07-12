import { Injectable } from '@nestjs/common';
import { Product } from "src/Entities/Product";

@Injectable()
export class ProductService {

    private readonly products: Product[] = [];

    getProductById(productId: number): Product {
        let product: Product;
        product = this.products.find(x => x.id === productId)
        return product;
    }
}