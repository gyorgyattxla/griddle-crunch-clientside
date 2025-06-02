export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  ingredients?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
