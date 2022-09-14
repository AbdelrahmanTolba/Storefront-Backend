import express from 'express';
import {
  showAllOrders,
  showOrder,
  getOrdersByUserId,
  updateOrder,
  createNewOrder,
  deleteOrder,
} from '../controllers/orders';
import tokenValidationMiddleWare from '../middlewares/authantication.middleware';

const orderRoute = express.Router();

orderRoute.get('/', showAllOrders);
orderRoute.get('/:id', showOrder);
orderRoute.get('/userOrders/:id', tokenValidationMiddleWare, getOrdersByUserId);
orderRoute.put('/edit', tokenValidationMiddleWare, updateOrder);
orderRoute.post('/create', tokenValidationMiddleWare, createNewOrder);
orderRoute.delete('/:id', tokenValidationMiddleWare, deleteOrder);

export default orderRoute;
