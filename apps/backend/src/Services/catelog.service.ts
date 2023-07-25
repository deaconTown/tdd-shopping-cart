import { Catelog } from "src/Entities/Catelog";
import { Product } from "src/Entities/Product";
import { ICatelogService } from "src/Interfaces/ICatelogService.interface";
import { IProductService } from "src/Interfaces/IProductService.interface";

export class CatelogService implements ICatelogService {

    private readonly catelogs: Catelog[] = [];

    constructor(private productService: IProductService) {
    }

    addCatelog(catelog: Catelog): Catelog {
        this.catelogs.push(catelog);
        return catelog;
    }

    GetCatelogs(): Catelog[] {
        return this.catelogs;
    }

    GetProductsByCatalogId(id: number): Product[] {
        let products: Product[] = [];
        let foundProduct: Product;
        let catalog : Catelog = this.GetCatelogById(id);

        if(catalog && catalog.items.length > 0)
        {
            catalog.items.forEach(x => {
                foundProduct = this.productService.getProductById(x.productId);
                if(foundProduct)
                {
                    products.push(foundProduct);
                }
            })
        }

        return products;
    }

    GetCatelogById(id: number): Catelog {
        return this.catelogs.find(x => x.id === id);
    }
}