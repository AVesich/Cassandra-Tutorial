export interface Shoe {
    name: string;
    brand_name: string;
    year_released: number;
    description: string;
    colorways: Set<string>;
}