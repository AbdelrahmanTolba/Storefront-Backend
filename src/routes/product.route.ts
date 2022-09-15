import express from 'express';
import {
  showAllProducts,
  showProduct,
  getTopFive,
  updateProduct,
  createNewProduct,
  deleteProduct,
} from '../controllers/products';
import tokenValidationMiddleWare from '../middlewares/authantication.middleware';

const productRoute = express.Router();

productRoute.get('/topfive', getTopFive);
productRoute.get('/', showAllProducts);
productRoute.get('/:id', showProduct);
productRoute.post('/create', tokenValidationMiddleWare, createNewProduct);
productRoute.put('/edit', tokenValidationMiddleWare, updateProduct);
productRoute.delete('/:id', tokenValidationMiddleWare, deleteProduct);

export default productRoute;
