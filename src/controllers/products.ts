import { ProductStore } from './../models/products';
import { Product } from './../interfaces/index';
import express, { Request, Response } from 'express';

const Products = new ProductStore();

const showAllProducts = async (_req: Request, res: Response) => {
  try {
    const product: Product[] = await Products.index();
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'showAllProducts',
      error: error,
    });
  }
};
const showProduct = async (req: Request, res: Response) => {
  try {
    const userId: number = req.params.id as unknown as number;
    const product: Product = await Products.show(userId);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'showProduct',
      error: error,
    });
  }
};
const createNewProduct = async (req: Request, res: Response) => {
  try {
    const productInfo: Product = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
    };

    if (!productInfo.name || !productInfo.price) {
      res.status(404);
      res.json({
        error: `name is < ${productInfo.name} >, price is < ${productInfo.price} >`,
      });
      return;
    }
    const product: Product = await Products.create(productInfo);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      method: 'createNewProduct',
      error: error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId: number = req.params.id as unknown as number;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const product: Product[] = await Products.deleteProduct(productId);
    res.json(`Product  ${productId} is deleted successfully`);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'deleteProduct',
      error: error,
    });
  }
};

const getTopFive = async (_req: Request, res: Response) => {
  try {
    const product: Product[] = await Products.topFiveProducts();
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'getTopFive',
      error: error,
    });
  }
};
const products_routes = (app: express.Application) => {
  app.get('/products', showAllProducts);
  app.get('/products/:id', showProduct);
  app.get('/topfive', getTopFive);
  app.post('/products', createNewProduct);
  app.delete('/products/:id', deleteProduct);
};
export default products_routes;
