import { Injectable } from '@nestjs/common';
import { Product } from '../Entities/Product';
import ProductException from '../Exception/ProductException';
import { IProductService } from '../Interfaces/IProductService.interface';

@Injectable()
export class ProductService implements IProductService {

    private readonly products: Product[] = [];

    getProductById(productId: number): Product {

        return this.products.find(x => x.id === productId);
    }

    addProduct(product: Product): Product {
        //check if product already exists 
        //TODO: MIGHT NEED ANOTHER WAY TO CHECK FOR DUPLICATE. MAYBE ANOTHER PROPORTY ON THE PRODUCT LIKE A QR CODE
        let productExists: boolean = this.CheckExists(product); 
        if (productExists) {
            // throw new Error('Product already exists');

            const ex = new ProductException('Product already exists');
            throw ex.ProductAlreadyExists();
        } 
        else {
            this.products.push(product);
        }

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
            //set updatd product with active flag true
            updatedProduct = product;
            updatedProduct.isActive = true;
        }

        //return the updated product
        return updatedProduct;
    }

    DeactivateProduct(product: Product): Product {
        //find the product
        let foundProduct: Product = this.products.find(x => x.id === product.id);
        let updatedProduct: Product;

        if (foundProduct) {
            //set updatd product with active flag false
            updatedProduct = product;
            updatedProduct.isActive = false;
        }

        //return the updated product
        return updatedProduct;
    }

    CheckExists(product: Product): boolean {
        //find the product
        let exists: boolean = false;
        let foundProduct: Product = this.products.find(x => x.id === product.id); //TODO: MIGHT NEED ANOTHER WAY TO CHECK FOR DUPLICATE

        //check if the product was found and is in stock;
        if(foundProduct && foundProduct.isInStock){
            if (!foundProduct.isActive || foundProduct.amountAvailable <= 0) {
                //set product to out of stock
                this.SetProductToOutOFStock(foundProduct.id);
            }
            else if(foundProduct.isActive)
            {
                exists = true;
            }
        }

        //return the updated product
        return exists;
    }

    SetProductToOutOFStock(id: number): void {
        //find the product
        let foundProduct: Product = this.products.find(x => x.id === id);
        let updatedProduct: Product;

        if (foundProduct) {
            //set updated product with isInStock flag to false
            updatedProduct = foundProduct;
            updatedProduct.isInStock = false;
        }
    }

    SetProductToBeInStock(id: number): void {
        //find the product
        let foundProduct: Product = this.products.find(x => x.id === id);
        let updatedProduct: Product;

        if (foundProduct) {
            //set updated product with isInStock flag to true
            updatedProduct = foundProduct;
            updatedProduct.isInStock = true;
        }
    }

}