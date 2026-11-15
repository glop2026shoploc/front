export interface Product {
    productId: string;
    name: string;
    price: number;
    pointsPrice: number | null;
    earnedPoints: number;
    quantity: number;
}
