import { Catelog } from "src/Entities/Catelog";

export interface ICatelogService {
    addCatelog(catelog1: Catelog): Catelog;
    
}