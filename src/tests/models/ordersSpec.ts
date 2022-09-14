import { Order } from './../../interfaces/order.interface';
import { OrderStore } from './../../models/orders';
import { User } from '../../interfaces/user.interface';
import { UserStore } from './../../models/users';
import { Product } from './../../interfaces/product.interface';
import { ProductStore } from './../../models/products';

const Orders: OrderStore = new OrderStore();
describe('Test Orders Model', () => {
  const UsersOrders: UserStore = new UserStore();
  const ProductsOrders: ProductStore = new ProductStore();
  let userId: number, productId: number, orderId: number;

  beforeAll(async () => {
    const NewUser_orders: User = {
      email: 'hesham@gmail.com',
      firstname: 'Hesham ',
      lastname: 'Ali',
      password: 'password321',
    };

    const user = await UsersOrders.create(NewUser_orders);
    userId = user.id as unknown as number;
    const NewProduct_orders: Product = {
      name: 'cat',
      price: 200,
      category: 'animals',
    };
    const product = await ProductsOrders.create(NewProduct_orders);
    productId = product.id as unknown as number;
  });

  it('create method', async () => {
    const NewOrder: Order = {
      product_id: productId,
      user_id: userId,
      quantity: 2,
      status: 'active',
    };
    const result = await Orders.create(NewOrder);
    orderId = result.id as unknown as number;
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: orderId,
      product_id: productId,
      user_id: userId,
      quantity: 2,
      status: 'active',
    });
  });

  it('index method', () => {
    async () => {
      const result = await Orders.index();
      expect(result).toBeDefined();
    };
  });

  it('select product method', async () => {
    const result = await Orders.show(orderId);
    expect(result).toEqual({
      id: orderId,
      product_id: productId,
      user_id: userId,
      quantity: 2,
      status: 'active',
    });
  });

  it('update method', async () => {
    const updatedOrder: Order = {
      id: orderId,
      product_id: productId,
      user_id: userId,
      quantity: 7,
      status: 'active',
    };
    const result = await Orders.update(updatedOrder);
    expect(result).toEqual({
      id: orderId,
      product_id: productId,
      user_id: userId,
      quantity: 7,
      status: 'active',
    });
  });
  it('detele method', async () => {
    const getAllOrders = await Orders.index();
    const orderId = getAllOrders[0].id as number;
    await Orders.delete(orderId);
    const orders = await Orders.index();
    expect(orders.length).toEqual(0);
  });
  afterAll(async () => {
    await Orders.delete(orderId);
    await ProductsOrders.deleteProduct(productId);
    await UsersOrders.delete(userId);
  });
});
