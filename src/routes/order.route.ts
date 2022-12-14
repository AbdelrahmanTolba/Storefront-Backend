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

orderRoute.get('/', tokenValidationMiddleWare, showAllOrders);
orderRoute.get('/:id', tokenValidationMiddleWare, showOrder);
orderRoute.get('/userorders/:id', tokenValidationMiddleWare, getOrdersByUserId);
orderRoute.put('/edit', tokenValidationMiddleWare, updateOrder);
orderRoute.post('/create', tokenValidationMiddleWare, createNewOrder);
orderRoute.delete('/:id', tokenValidationMiddleWare, deleteOrder);

export default orderRoute;
