import { Product } from './../../interfaces/product.interface';
import { ProductStore } from './../../models/products';

const Products: ProductStore = new ProductStore();
let productId: number;
describe('Test Products Model', () => {
  const NewProduct: Product = {
    name: 'cheetos',
    price: 5,
    category: 'food',
  };

  it('create method', async () => {
    const result = await Products.create(NewProduct);
    productId = result.id as unknown as number;
    expect(result).toBeDefined();
  });
  it('index method', () => {
    async () => {
      const result = await Products.index();
      expect(result).toBeDefined();
    };
  });

  it('select product method', async () => {
    const result = await Products.show(productId);
    expect(result).toEqual({
      id: productId,
      name: 'cheetos',
      price: 5,
      category: 'food',
    });
  });

  it('update method', async () => {
    const updatedPrduct: Product = {
      id: productId,
      name: 'chips',
      price: 5,
      category: 'food',
    };
    const result = await Products.update(updatedPrduct);
    expect(result).toBeDefined();
  });
  it('detele method', async () => {
    const getAllProducts = await Products.index();
    const productId = getAllProducts[0].id as number;
    await Products.deleteProduct(productId);
    const products = await Products.index();
    expect(products.length).toEqual(0);
  });
  afterAll(async () => {
    await Products.deleteProduct(productId);
  });
});
