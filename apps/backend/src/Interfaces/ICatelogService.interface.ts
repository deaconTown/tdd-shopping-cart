import { Catelog } from "src/Entities/Catelog";

export interface ICatelogService {
    addCatelog(catelog: Catelog): Catelog;
    GetCatelogs(): Catelog[];
    
}