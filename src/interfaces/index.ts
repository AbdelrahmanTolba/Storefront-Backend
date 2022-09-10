export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
}
export interface Product {
  id?: number;
  name: string;
  price: number;
  category?: string;
}
export interface Order {
  id?: number;
  product_id: number;
  user_id: number;
  quantity: number;
  status: string;
}
