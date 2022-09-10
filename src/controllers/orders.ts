import { OrderStore } from './../models/orders';
import { Order } from './../interfaces/index';
import express, { Request, Response } from 'express';

const Orders = new OrderStore();

const showAllOrders = async (_req: Request, res: Response) => {
  try {
    const order: Order[] = await Orders.index();
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'showAllOrders',
      error: error,
    });
  }
};
const showOrder = async (req: Request, res: Response) => {
  try {
    const orderId: number = req.params.id as unknown as number;
    const order: Order = await Orders.show(orderId);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'showOrder',
      error: error,
    });
  }
};
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo: Order = {
      product_id: req.body.productId as unknown as number,
      user_id: req.body.userId as unknown as number,
      quantity: req.body.quantity as unknown as number,
      status: req.body.status as unknown as string,
    };

    if (!orderInfo.product_id || !orderInfo.user_id || !orderInfo.quantity) {
      res.status(404);
      res.json({
        error: `product_id is < ${orderInfo.product_id} >, user_id is < ${orderInfo.user_id}, quantity is < ${orderInfo.quantity} >`,
      });
      return;
    }
    const order: Order = await Orders.create(orderInfo);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      method: 'createNewOrder',
      error: error,
    });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId: number = req.params.id as unknown as number;
    const order: Order[] = await Orders.userOrders(userId);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'getOrdersByUserId',
      error: error,
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId: number = req.params.id as unknown as number;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const order: Order[] = await Orders.deleteOrder(orderId);
    res.json(`Order  ${orderId} is deleted successfully`);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'deleteOrder',
      error: error,
    });
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', showAllOrders);
  app.get('/orders/:id', showOrder);
  app.get('/userOrders/:id', getOrdersByUserId);
  app.post('/orders', createNewOrder);
  app.delete('/orders/:id', deleteOrder);
};
export default orders_routes;
