import { Catelog } from "src/Entities/Catelog";
import { ICatelogService } from "src/Interfaces/ICatelogService.interface";

export class CatelogService implements ICatelogService{

    addCatelog(catelog: Catelog): Catelog {
        throw new Error("Method not implemented.");
    }

}