export interface Order {
  id?: number;
  product_id: number;
  user_id: number;
  quantity: number;
  status: string;
}
