import { ProductStore } from './../models/products';
import { Product } from './../interfaces/product.interface';
import { Request, Response } from 'express';

const Products = new ProductStore();

const showAllProducts = async (_req: Request, res: Response) => {
  try {
    const product: Product[] = await Products.index();
    res.json(product);
  } catch (error) {
    res.status(401);
    res.json({
      status: 401,
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
    res.status(401);
    res.json({
      status: 401,

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
    res.status(401);
    res.json({
      status: 401,
      method: 'createNewProduct',
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productInfo: Product = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
      id: req.body.id as unknown as number,
    };

    if (!productInfo.name || !productInfo.price || !productInfo.id) {
      res.status(404);
      res.json({
        error: `name is < ${productInfo.name} >, price is < ${productInfo.price}  >, id is < ${productInfo.id} >`,
      });
      return;
    }
    const product: Product = await Products.update(productInfo);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({
      status: 401,
      method: 'updateProduct',
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
    res.status(401);
    res.json({
      status: 401,
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
    res.status(401);
    res.json({
      status: 401,
      method: 'getTopFive',
      error: error,
    });
  }
};

export {
  showAllProducts,
  showProduct,
  getTopFive,
  updateProduct,
  createNewProduct,
  deleteProduct,
};
