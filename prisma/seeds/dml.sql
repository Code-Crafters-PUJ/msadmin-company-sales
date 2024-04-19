-- Insert clients
INSERT INTO "Client" ("companyName", "contactName", email, telephone, nit)
VALUES ('Tech Inc.', 'John Doe', 'john.doe@techinc.com', 1234567890, 123456789);

INSERT INTO "Client" ("companyName", "contactName", email, telephone, nit)
VALUES ('Marketing Solutions', 'Jane Smith', 'jane.smith@marketingsolutions.com', 9876543210, 987654321);

-- Insert plans
INSERT INTO "Plan" (type, price, description, duration)
VALUES ('Silver', 100.00, 'Limited features, ideal for small businesses', 12);

INSERT INTO "Plan" (type, price, description, duration)
VALUES ('Gold', 200.00, 'Full features, suitable for growing businesses', 6);

-- Insert payments
INSERT INTO "Payment" (method)
VALUES ('Credit Card');

INSERT INTO "Payment" (method)
VALUES ('Bank Transfer');

-- Insert billings
INSERT INTO "Billing" ("initialDate", "finalDate", "planId", "clientId", "paymentId", amount, "paymentDate")
VALUES ('2024-03-29', '2024-04-28', 1, 1, 1, 100.00, '2024-03-29');  -- Silver plan for Tech Inc.

INSERT INTO "Billing" ("initialDate", "finalDate", "planId", "clientId", "paymentId", amount, "paymentDate")
VALUES ('2024-03-29', '2025-03-28', 2, 2, 2, 200.00, '2024-03-29');  -- Gold plan for Marketing Solutions

-- Insert sales
INSERT INTO "Service" (name, "updatedAt", users, status)
VALUES ('Nómina', '2024-04-19', 100,  true);

INSERT INTO "Service" (name, "updatedAt", users, status)
VALUES ('Ventas', '2024-04-18', 1000,  true);

-- Insert coupons
INSERT INTO "Coupon" ("code", "duration", "discount", "expirationDate", "status", "clientId")
VALUES ('DISCOUNT10', '10:00:00', 10, '2024-04-20', true, 1);

INSERT INTO "Coupon" ("code", "duration", "discount", "expirationDate", "status", "clientId")
VALUES ('DISCOUNT15', '10:00:00', 15, '2024-04-20', true, 2);
