import { CatelogItem } from "./CatelogItem";
import { Product } from "./Product";

export class Catelog {
    id: number;
    name: string;
    category: string;
    isActive: boolean;
    items: CatelogItem[];
}