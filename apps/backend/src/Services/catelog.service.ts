import { Catelog } from "src/Entities/Catelog";
import { CatelogItem } from "src/Entities/CatelogItem";
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
    
    CheckIfCatelogExists(id: number): boolean {
        let exists: boolean = false;
        let catalog: Catelog = this.catelogs.find(x => x.id === id);
        
        if(catalog)
        {
            exists = true;
        }
        
        return exists;
    }

    GetAllActiveCatelogs(): Catelog[] {
        return this.catelogs.filter(x => x.isActive === true);
    }
    
    ActivateCatelog(id: number): Catelog {
        let calelog: Catelog = this.catelogs.find(x => x.id === id);
        let updatedCatelog: Catelog;

        if(calelog)
        {
            updatedCatelog = calelog;
            updatedCatelog.isActive = true
        }
        
        return updatedCatelog;
    }

    DeactivateCatelog(id: number): Catelog {
        let calelog: Catelog = this.catelogs.find(x => x.id === id);
        let updatedCatelog: Catelog;

        if(calelog)
        {
            updatedCatelog = calelog;
            updatedCatelog.isActive = false
        }

        return updatedCatelog;
    }
    
    AddProductionToCatelog(id: number, product: Product, qty: number): Catelog {
        let calelog: Catelog = this.catelogs.find(x => x.id === id);

        if(calelog)
        {
            let catalogItemList: CatelogItem[] = calelog.items;
            let productToAdd = this.productService.getProductById(product.id);

            if(productToAdd)
            {
                let newItemId: number = catalogItemList[catalogItemList.length - 1].id + 1;
                let newCatalogItem : CatelogItem = {id: newItemId, productId: productToAdd.id, qty}
                catalogItemList.push(newCatalogItem);

                calelog.items = catalogItemList;
            }
        }

        return calelog;
    }
}