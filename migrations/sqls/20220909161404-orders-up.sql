
CREATE TYPE mood AS ENUM ('active', 'complete');

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  quantity INTEGER NOT NULL,
  status mood NOT NULL
  );