import { Catelog } from "src/Entities/Catelog";
import { Product } from "src/Entities/Product";

export interface ICatelogService {
    addCatelog(catelog: Catelog): Catelog;
    GetCatelogs(): Catelog[];
    GetCatelogById(id: number): Catelog;
    GetProductsByCatalogId(id:number): Product[];
    
}