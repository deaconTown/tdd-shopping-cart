import { Injectable } from '@nestjs/common';
import { Product } from "src/Entities/Product";

@Injectable()
export class ProductService {

    private readonly products: Product[] = [];

    getProductById(productId: number): Product {
        
        return this.products.find(x => x.id === productId);
    }

    addProduct(product: Product) : Product {
        this.products.push(product);

        return product;
    }
}