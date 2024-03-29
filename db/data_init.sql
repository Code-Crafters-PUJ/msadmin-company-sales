/*
CREATE DATABASE  bd_company_sales;
\c bd_company_sales;
*/
CREATE TABLE IF NOT EXISTS client (
  client_id SERIAL PRIMARY KEY,
  company_name VARCHAR(45) NOT NULL,
  contact_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  telephone BIGINT  NOT NULL,
  RUT BIGINT  NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS suscription (
  suscription_id SERIAL PRIMARY KEY,
  initial_date DATE NOT NULL,
  final_date DATE NOT NULL,
  suscription_status SMALLINT NOT NULL,
  usage TIME NOT NULL,

  plan_id INT NOT NULL,
  client_id INT NOT NULL,
  payment_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS plan (
  plan_id SERIAL PRIMARY KEY,
  plan_type VARCHAR(45) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  plan_description VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS payment (
  payment_id SERIAL PRIMARY KEY,
  payment_date DATE NOT NULL,
  method VARCHAR(45) NOT NULL,
  amount DOUBLE PRECISION NOT NULL
);

-- Client - Suscription
ALTER TABLE suscription
ADD CONSTRAINT fk_suscription_client1_idx
FOREIGN KEY (client_id)
REFERENCES client (client_id);

-- Suscription - Plan
ALTER TABLE suscription
ADD CONSTRAINT fk_suscription_plan1_idx
FOREIGN KEY (plan_id)
REFERENCES plan (plan_id);

-- Suscription - Payment
ALTER TABLE suscription
ADD CONSTRAINT fk_suscription_payment1_idx
FOREIGN KEY (payment_id)
REFERENCES payment (payment_id);


-- Insert clients
INSERT INTO client (company_name, contact_name, email, telephone, RUT)
VALUES ('Tech Inc.', 'John Doe', 'john.doe@techinc.com', 1234567890, 123456789);

INSERT INTO client (company_name, contact_name, email, telephone, RUT)
VALUES ('Marketing Solutions', 'Jane Smith', 'jane.smith@marketingsolutions.com', 9876543210, 987654321);

-- Insert plans
INSERT INTO plan (plan_type, price, plan_description)
VALUES ('Basic', 100.00, 'Limited features, ideal for small businesses');

INSERT INTO plan (plan_type, price, plan_description)
VALUES ('Premium', 200.00, 'Full features, suitable for growing businesses');

-- Insert payments
INSERT INTO payment (payment_date, method, amount)
VALUES ('2024-03-29', 'Credit Card', 100.00);

INSERT INTO payment (payment_date, method, amount)
VALUES ('2024-03-29', 'Bank Transfer', 200.00);

-- Insert subscriptions
INSERT INTO suscription (initial_date, final_date, suscription_status, usage, plan_id, client_id, payment_id)
VALUES ('2024-03-29', '2024-04-28', 1, '00:30:45', 1, 1, 1);  -- Basic plan for Tech Inc.

INSERT INTO suscription (initial_date, final_date, suscription_status, usage, plan_id, client_id, payment_id)
VALUES ('2024-03-29', '2025-03-28', 1, '12:30:45', 2, 2, 2);  -- Premium plan for Marketing Solutions


