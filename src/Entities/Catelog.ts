import { Products } from "./Products";

export class Catelog {
    id: number;
    name: string;
    category: string;
    isActive: boolean;
    products: Products[];
}