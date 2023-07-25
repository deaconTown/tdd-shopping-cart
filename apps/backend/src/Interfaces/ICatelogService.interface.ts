import { Catelog } from "src/Entities/Catelog";
import { Product } from "src/Entities/Product";

export interface ICatelogService {
    addCatelog(catelog: Catelog): Catelog;
    GetCatelogs(): Catelog[];
    GetCatelogById(id: number): Catelog;
    GetProductsByCatalogId(id:number): Product[];
    CheckIfCatelogExists(id: number): boolean;
    GetAllActiveCatelogs(): Catelog[];
    ActivateCatelog(id: number): Catelog;    
    DeactivateCatelog(id: number): Catelog;
    AddProductionToCatelog(id: number, product: Product, qty: number): Catelog;
    UpdateCatelogProductQty(id: number, productId: number, newQty: number): Catelog;
    DeleteProductFromCatelog(id: number, id1: number): Catelog;
}