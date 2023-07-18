import { Injectable } from '@nestjs/common';
import { Product } from "src/Entities/Product";
import { IProductService } from 'src/Interfaces/IProductService.interface';

@Injectable()
export class ProductService implements IProductService{
  
    private readonly products: Product[] = [];

    getProductById(productId: number): Product {
        
        return this.products.find(x => x.id === productId);
    }

    addProduct(product: Product) : Product {
        this.products.push(product);

        return product;
    }  
    
    GetAllProducts(): Product[] {
        return this.products;
    }

    GetAllActiveProducts(): Product[] {
        throw new Error('Method not implemented.');
    }
}