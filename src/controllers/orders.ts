import { OrderStore } from './../models/orders';
import { Order } from './../interfaces/order.interface';
import { Request, Response } from 'express';

const Orders = new OrderStore();

const showAllOrders = async (_req: Request, res: Response) => {
  try {
    const order: Order[] = await Orders.index();
    res.json(order);
  } catch (error) {
    res.status(402);
    res.json({
      status: 402,
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
    res.status(402);
    res.json({
      status: 402,
      method: 'showOrder',
      error: error,
    });
  }
};
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo: Order = {
      product_id: req.body.product_id as unknown as number,
      user_id: req.body.user_id as unknown as number,
      quantity: req.body.quantity as unknown as number,
      status: req.body.status as unknown as string,
    };

    if (!orderInfo.product_id || !orderInfo.user_id || !orderInfo.quantity) {
      res.status(400);
      res.json({
        status: 400,
        error: `product_id is < ${orderInfo.product_id} >, user_id is < ${orderInfo.user_id} >, quantity is < ${orderInfo.quantity}, status is < ${orderInfo.status} > and it must be <active | complete>`,
      });
      return;
    }
    const order: Order = await Orders.create(orderInfo);
    res.json(order);
  } catch (error) {
    res.status(402);
    res.json({
      status: 402,
      method: 'createNewOrder',
      error: error,
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo: Order = {
      product_id: req.body.product_id as unknown as number,
      user_id: req.body.user_id as unknown as number,
      quantity: req.body.quantity as unknown as number,
      status: req.body.status as unknown as string,
      id: req.body.id as unknown as number,
    };

    if (
      !orderInfo.product_id ||
      !orderInfo.user_id ||
      !orderInfo.quantity ||
      !orderInfo.id
    ) {
      res.status(404);
      res.json({
        status: 404,
        error: `product_id is < ${orderInfo.product_id} >, user_id is < ${orderInfo.user_id}, quantity is < ${orderInfo.quantity} >, id is < ${orderInfo.id}, status is < ${orderInfo.status} > and it must be <active | complete> >`,
      });
      return;
    }
    const order: Order = await Orders.update(orderInfo);
    res.json(order);
  } catch (error) {
    res.status(402);
    res.json({
      status: 402,
      method: 'updateOrder',
      error: error,
    });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.params.id as unknown as number;
    const order: Order[] = await Orders.userOrders(user_id);
    res.json(order);
  } catch (error) {
    res.status(402);
    res.json({
      status: 402,
      method: 'getOrdersByuser_id',
      error: error,
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId: number = req.params.id as unknown as number;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const order: Order[] = await Orders.delete(orderId);
    res.json(`Order  ${orderId} is deleted successfully`);
  } catch (error) {
    res.status(402);
    res.json({
      status: 402,
      method: 'deleteOrder',
      error: error,
    });
  }
};

export {
  showAllOrders,
  showOrder,
  getOrdersByUserId,
  updateOrder,
  createNewOrder,
  deleteOrder,
};
