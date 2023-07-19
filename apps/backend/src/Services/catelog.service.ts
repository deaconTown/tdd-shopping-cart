import { Catelog } from "src/Entities/Catelog";
import { ICatelogService } from "src/Interfaces/ICatelogService.interface";

export class CatelogService implements ICatelogService {

    private readonly catelogs: Catelog[] = [];

    addCatelog(catelog: Catelog): Catelog {
        this.catelogs.push(catelog);
        return catelog;
    }

    GetCatelogs(): Catelog[] {
        return this.catelogs;
    }
}