import { Injectable } from '@nestjs/common';
import { Product } from 'src/Entities/Product';
import { IProductService } from 'src/Interfaces/IProductService.interface';

@Injectable()
export class ProductService implements IProductService {

    private readonly products: Product[] = [];

    getProductById(productId: number): Product {

        return this.products.find(x => x.id === productId);
    }

    addProduct(product: Product): Product {
        this.products.push(product);

        return product;
    }

    GetAllProducts(): Product[] {
        return this.products;
    }

    GetAllActiveProducts(): Product[] {
        return this.products.filter(x => x.isActive === true);
    }

    ActivateProduct(product: Product): Product {
        //find the product
        let foundProduct: Product = this.products.find(x => x.id === product.id);
        let updatedProduct: Product;

        if (foundProduct) {
            //create new product with active flag
            updatedProduct = product;
            updatedProduct.isActive = true;
        }

        //return the updated product
        return updatedProduct;
    }
}