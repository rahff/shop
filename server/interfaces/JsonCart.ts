export type JsonCart = {
    customer: number;
    items: JsonCartItem[];
    amount: number;
    validated: boolean;
}

export type JsonCartItem = {
    product_name: string;
    product_price: number;
    quantity: number;
    image_url: string;
    amount: number;
    product_id: number;
}