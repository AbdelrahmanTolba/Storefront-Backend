# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index: `'products/' [GET]`
- show: `'products/:id' [GET]`
- create (args: Product)[token required]: `'products/create' [POST]`
- [OPTIONAL] Top 5 most popular products `'products/togfive' [GET]`
- [ADDED] update: `'products/edit  [PUT]`
- [ADDED] Delete: `'products/:id  [DELETE]`

#### Users
- Index [token required] `'users/' [GET]`
- Show [token required] 'users/:id' [GET]`
- Create 'users/create' [POST]`
- [ADDED] update [token required]: `'users/edit  [PUT]`
- [ADDED] Delete [token required]: `'users/:id  [DELETE]`

#### Orders
- [ADDED] index: `'/orders  [GET]`
- [ADDED] show: `'/orders/:id  [GET]`
- Current Order by user (args: user id)[token required] '/orders/userOrders/:id  [GET]`
- [ADDED] create [token required]: `'orders/create  [POST]`
- [ADDED] update [token required]: `'orders/edit  [PUT]`
- [ADDED] Delete [token required]: `'orders/:id  [DELETE]`
## Data Shapes
#### Product
- id :number
- name :string
- price :number
- [OPTIONAL] category :string
```sh
 TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) 
  );
```
#### User
- id :number
- email :string 
- firstName :string
- lastName :string
- password :string

```sh
   TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(250) NOT NULL UNIQUE,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    password VARCHAR(250) NOT NULL
  );
```

#### Orders
- id :number
- id of each product in the order :number
- quantity of each product in the order :number
- user_id :number
- status of order (active or complete):string

```sh
  TYPE mood AS ENUM ('active', 'complete');

  TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  quantity INTEGER NOT NULL,
  status mood NOT NULL
  );
```

