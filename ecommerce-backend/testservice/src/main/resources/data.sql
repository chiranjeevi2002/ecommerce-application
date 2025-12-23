------------------------------------------------------------
-- H2 LOCAL SEED DATA
-- This file assumes:
--  - Tables are created by JPA (ddl-auto=update)
--  - All services share the same DB (adjust schema/table names if not)
--  - Passwords are plain-text for local dev (configure encoder accordingly)
------------------------------------------------------------

------------------------------------------------------------
-- STORES
------------------------------------------------------------
DELETE FROM stores;
INSERT INTO stores (id, code, name, branding_config_path, feature_flags, default_locale, default_currency, active)
VALUES
(211, 'flowers',    'Flower Store',       NULL, NULL, 'en_IN', 'INR', TRUE),
(212, 'medcare',    'Medical Store',      NULL, NULL, 'en_IN', 'INR', TRUE),
(213, 'groceries',  'Grocery Store',      NULL, NULL, 'en_IN', 'INR', TRUE),
(214, 'electronics','Electronics Store',  NULL, NULL, 'en_IN', 'INR', TRUE);

------------------------------------------------------------
-- ROLES (userservice.roles)
------------------------------------------------------------
DELETE FROM user_roles;
DELETE FROM roles;

INSERT INTO roles (id, name) VALUES
(202129, 'ROLE_SUPERADMIN'),
(412801, 'ROLE_ADMIN'),
(412802, 'ROLE_CUSTOMER'),
(412803, 'ROLE_VENDOR'),
(412804, 'ROLE_STORE_MANAGER'),
(412805, 'ROLE_PRODUCT_MANAGER'),
(412806, 'ROLE_ORDER_MANAGER'),
(412807, 'ROLE_INVENTORY_MANAGER'),
(412808, 'ROLE_CUSTOMER_SUPPORT'),
(412809, 'ROLE_MARKETING_MANAGER'),
(412810, 'ROLE_FINANCE'),
(412811, 'ROLE_DEVELOPER'),
(412812, 'ROLE_GUEST');

------------------------------------------------------------
-- USERS (userservice.users)
-- SUPERADMIN_STORE = 0 (global)
------------------------------------------------------------
DELETE FROM users;

INSERT INTO users (id, username, email, store_id, password, full_name, phone, created_at)
VALUES
(1, 'chiru_superadmin', 'chiru_superadmin@yopmail.com', 0, '$2a$10$/bfYVFMbxrYButt0T/c1W.KomegkLpUsq7OChQtyGEq2sRvsQvJpy', 'Chiru Superadmin', '9999990001', CURRENT_TIMESTAMP()),
(2, 'chiru_admin',      'chiru_admin@yopmail.com',      0, '$2a$10$HmsJYJdhbhn1daelkGiP8ea0hNmcT0dEPvpbiIbaRFlzpIaR0BrsO',      'Chiru Admin',      '9999990002', CURRENT_TIMESTAMP()),
(3, 'chiru_customer',   'chiru_customer@yopmail.com',   0, '$2a$10$IAgcn3Rkw.JnXyIi7He5gu0Rzf/RngrcD5mUT3PuuG658vuL/rz9e',   'Chiru Customer',   '9999990003', CURRENT_TIMESTAMP());

------------------------------------------------------------
-- USER ROLES (userservice.user_roles)
-- Superadmin has ALL roles, admin has ADMIN+MANAGER, customer has CUSTOMER only
------------------------------------------------------------
INSERT INTO user_roles (user_id, role_id) VALUES
-- Superadmin
(1, 202129),
(1, 412801),
(1, 412802),
(1, 412803),
(1, 412804),
(1, 412805),
(1, 412806),
(1, 412807),
(1, 412808),
(1, 412809),
(1, 412810),
(1, 412811),
(1, 412812),

-- Admin
(2, 412801),
(2, 412804),
(2, 412805),
(2, 412806),
(2, 412807),

-- Customer
(3, 412802);

------------------------------------------------------------
-- PRODUCT SERVICE: CATEGORIES
------------------------------------------------------------
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Flower Store (211)
INSERT INTO categories (id, name, description, store_id) VALUES
(1101, 'Bouquets',          'Fresh flower bouquets for all occasions', 211),
(1102, 'Roses',             'Premium roses in multiple colours',       211),
(1103, 'Lilies',            'Lilies and seasonal flowers',             211),
(1104, 'Plants',            'Indoor and outdoor potted plants',        211),
(1105, 'Gift Combos',       'Flowers with chocolates and gifts',       211);

-- Medical Store (212)
INSERT INTO categories (id, name, description, store_id) VALUES
(1201, 'Pain Relief',       'Tablets and syrups for pain relief',         212),
(1202, 'Cold & Flu',        'Medicines for cold, cough and flu',         212),
(1203, 'Vitamins',          'Daily multivitamins and supplements',       212),
(1204, 'First Aid',         'First aid kits and essentials',             212),
(1205, 'Personal Care',     'Skin, hair and hygiene products',           212);

-- Grocery Store (213)
INSERT INTO categories (id, name, description, store_id) VALUES
(1301, 'Fruits & Vegetables', 'Fresh fruits and vegetables',             213),
(1302, 'Dairy',                'Milk, curd, cheese and more',            213),
(1303, 'Snacks',               'Chips, biscuits and namkeen',            213),
(1304, 'Beverages',            'Soft drinks, juices and tea/coffee',     213),
(1305, 'Staples',              'Rice, pulses, oils and flours',          213);

-- Electronics Store (214)
INSERT INTO categories (id, name, description, store_id) VALUES
(1401, 'Mobiles',            'Smartphones and accessories',              214),
(1402, 'Laptops',            'Laptops for work, study and gaming',       214),
(1403, 'Accessories',        'Headphones, chargers and more',            214),
(1404, 'Televisions',        'LED, OLED and smart TVs',                  214),
(1405, 'Home Appliances',    'Microwave, washing machine, fridge etc.',  214);

------------------------------------------------------------
-- PRODUCTS + IMAGES
-- We'll create ~10 products per store (40 total)
------------------------------------------------------------

-- Clean in case of FK constraints
DELETE FROM inventory;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM payments;

------------------------------------------------------------
-- FLOWER STORE PRODUCTS (store_id = 211)
------------------------------------------------------------
INSERT INTO products (id, name, description, price, quantity, store_id, category_id, created_at) VALUES
(2001, 'Red Rose Bouquet (20 stems)',  'Classic red roses with fillers',                 799.00, 100, 211, 1102, CURRENT_TIMESTAMP()),
(2002, 'Pink Lily Bouquet',            'Hand-tied bouquet with pink lilies',            999.00, 60,  211, 1103, CURRENT_TIMESTAMP()),
(2003, 'Mixed Flower Basket',          'Colourful mix of seasonal flowers',             1199.00,80,  211, 1101, CURRENT_TIMESTAMP()),
(2004, 'Money Plant in Ceramic Pot',   'Indoor air-purifying plant',                    499.00, 50,  211, 1104, CURRENT_TIMESTAMP()),
(2005, 'Lucky Bamboo (3 Layer)',       'Vastu friendly lucky bamboo plant',            399.00,  70,  211, 1104, CURRENT_TIMESTAMP()),
(2006, 'Rose & Dairy Milk Combo',      'Red roses with chocolates',                    899.00,  40,  211, 1105, CURRENT_TIMESTAMP()),
(2007, 'Anniversary Special Bouquet',  'Premium bouquet for anniversaries',            1499.00,30,  211, 1101, CURRENT_TIMESTAMP()),
(2008, 'Yellow Roses Bunch (12)',      'Bright yellow roses for friendship',           649.00,  80,  211, 1102, CURRENT_TIMESTAMP()),
(2009, 'Office Desk Plant Set',        'Set of 3 mini plants for desk',                1299.00,25,  211, 1104, CURRENT_TIMESTAMP()),
(2010, 'Birthday Flower Combo',        'Flowers with greeting card',                   999.00,  45,  211, 1105, CURRENT_TIMESTAMP());

INSERT INTO product_images (id, image_url, store_id, sort_order, product_id) VALUES
(3001, '/uploads/store-211/red-rose-bouquet.jpg',        211, 0, 2001),
(3002, '/uploads/store-211/pink-lily-bouquet.jpg',       211, 0, 2002),
(3003, '/uploads/store-211/mixed-flower-basket.jpg',     211, 0, 2003),
(3004, '/uploads/store-211/money-plant.jpg',             211, 0, 2004),
(3005, '/uploads/store-211/lucky-bamboo.jpg',            211, 0, 2005),
(3006, '/uploads/store-211/rose-dairy-milk-combo.jpg',   211, 0, 2006),
(3007, '/uploads/store-211/anniversary-bouquet.jpg',     211, 0, 2007),
(3008, '/uploads/store-211/yellow-roses.jpg',            211, 0, 2008),
(3009, '/uploads/store-211/desk-plant-set.jpg',          211, 0, 2009),
(3010, '/uploads/store-211/birthday-flower-combo.jpg',   211, 0, 2010);

------------------------------------------------------------
-- MEDICAL STORE PRODUCTS (store_id = 212)
------------------------------------------------------------
INSERT INTO products (id, name, description, price, quantity, store_id, category_id, created_at) VALUES
(2101, 'Paracetamol 500mg (Strip of 10)', 'Pain and fever reducer tablets',         35.00,  500, 212, 1201, CURRENT_TIMESTAMP()),
(2102, 'Ibuprofen 400mg (Strip of 10)',    'Anti-inflammatory and pain reliever',    55.00,  400, 212, 1201, CURRENT_TIMESTAMP()),
(2103, 'Cough Syrup 100ml',                'Relief from dry and wet cough',         110.00, 300, 212, 1202, CURRENT_TIMESTAMP()),
(2104, 'Vitamin C 500mg (30 tabs)',        'Boosts immunity and skin health',       199.00, 200, 212, 1203, CURRENT_TIMESTAMP()),
(2105, 'Multivitamin Tablets (30 tabs)',   'Daily multivitamin supplement',         249.00, 200, 212, 1203, CURRENT_TIMESTAMP()),
(2106, 'First Aid Kit Basic',              'Essential first aid supplies',          399.00, 80,  212, 1204, CURRENT_TIMESTAMP()),
(2107, 'Digital Thermometer',              'Fast and accurate temperature reading', 299.00, 120, 212, 1204, CURRENT_TIMESTAMP()),
(2108, 'Hand Sanitizer 500ml',             'Alcohol-based sanitizer',               149.00, 250, 212, 1205, CURRENT_TIMESTAMP()),
(2109, 'Antiseptic Liquid 100ml',          'For minor cuts and wounds',             75.00,  200, 212, 1204, CURRENT_TIMESTAMP()),
(2110, 'Moisturizing Lotion 200ml',        'Daily body moisturizer',                220.00, 150, 212, 1205, CURRENT_TIMESTAMP());

INSERT INTO product_images (id, image_url, store_id, sort_order, product_id) VALUES
(3101, '/uploads/store-212/paracetamol-500.jpg',     212, 0, 2101),
(3102, '/uploads/store-212/ibuprofen-400.jpg',       212, 0, 2102),
(3103, '/uploads/store-212/cough-syrup.jpg',         212, 0, 2103),
(3104, '/uploads/store-212/vitamin-c.jpg',           212, 0, 2104),
(3105, '/uploads/store-212/multivitamin.jpg',        212, 0, 2105),
(3106, '/uploads/store-212/first-aid-kit.jpg',       212, 0, 2106),
(3107, '/uploads/store-212/digital-thermometer.jpg', 212, 0, 2107),
(3108, '/uploads/store-212/hand-sanitizer.jpg',      212, 0, 2108),
(3109, '/uploads/store-212/antiseptic-liquid.jpg',   212, 0, 2109),
(3110, '/uploads/store-212/moisturizing-lotion.jpg', 212, 0, 2110);

------------------------------------------------------------
-- GROCERY STORE PRODUCTS (store_id = 213)
------------------------------------------------------------
INSERT INTO products (id, name, description, price, quantity, store_id, category_id, created_at) VALUES
(2201, 'Bananas (1 Dozen)',           'Fresh Cavendish bananas',            60.00,  120, 213, 1301, CURRENT_TIMESTAMP()),
(2202, 'Tomatoes (1 kg)',            'Fresh red tomatoes',                 45.00,  100, 213, 1301, CURRENT_TIMESTAMP()),
(2203, 'Full Cream Milk (1 L)',      'Packaged full cream milk',           72.00,  200, 213, 1302, CURRENT_TIMESTAMP()),
(2204, 'Curd (500 g)',               'Fresh dairy curd',                   45.00,  150, 213, 1302, CURRENT_TIMESTAMP()),
(2205, 'Potato Chips (Large Pack)',  'Classic salted potato chips',        99.00,  180, 213, 1303, CURRENT_TIMESTAMP()),
(2206, 'Chocolate Cookies (Pack)',   'Choco-chip cookies',                 80.00,  160, 213, 1303, CURRENT_TIMESTAMP()),
(2207, 'Orange Juice (1 L)',         'Packed fruit beverage',              120.00, 130, 213, 1304, CURRENT_TIMESTAMP()),
(2208, 'Tea Powder (500 g)',         'Strong Assam tea blend',             210.00, 90,  213, 1304, CURRENT_TIMESTAMP()),
(2209, 'Basmati Rice (5 kg)',        'Premium long-grain Basmati rice',    599.00, 70,  213, 1305, CURRENT_TIMESTAMP()),
(2210, 'Sunflower Oil (1 L)',        'Refined sunflower cooking oil',      155.00, 100, 213, 1305, CURRENT_TIMESTAMP());

INSERT INTO product_images (id, image_url, store_id, sort_order, product_id) VALUES
(3201, '/uploads/store-213/bananas.jpg',        213, 0, 2201),
(3202, '/uploads/store-213/tomatoes.jpg',       213, 0, 2202),
(3203, '/uploads/store-213/full-cream-milk.jpg',213, 0, 2203),
(3204, '/uploads/store-213/curd.jpg',           213, 0, 2204),
(3205, '/uploads/store-213/potato-chips.jpg',   213, 0, 2205),
(3206, '/uploads/store-213/choco-cookies.jpg',  213, 0, 2206),
(3207, '/uploads/store-213/orange-juice.jpg',   213, 0, 2207),
(3208, '/uploads/store-213/tea-powder.jpg',     213, 0, 2208),
(3209, '/uploads/store-213/basmati-rice.jpg',   213, 0, 2209),
(3210, '/uploads/store-213/sunflower-oil.jpg',  213, 0, 2210);

------------------------------------------------------------
-- ELECTRONICS STORE PRODUCTS (store_id = 214)
------------------------------------------------------------
INSERT INTO products (id, name, description, price, quantity, store_id, category_id, created_at) VALUES
(2301, 'Smartphone X 128GB',          '6.5" display, 128GB storage, 5G',       24999.00, 50, 214, 1401, CURRENT_TIMESTAMP()),
(2302, 'Smartphone Y 64GB',           '6.1" display, 64GB storage, 4G',        17999.00, 80, 214, 1401, CURRENT_TIMESTAMP()),
(2303, 'Laptop Pro 14"',              '14" laptop, 16GB RAM, 512GB SSD',       74999.00, 30, 214, 1402, CURRENT_TIMESTAMP()),
(2304, 'Laptop Air 13"',              '13" lightweight laptop, 8GB RAM',       55999.00, 40, 214, 1402, CURRENT_TIMESTAMP()),
(2305, 'Wireless Headphones',         'Over-ear wireless headphones',          2999.00,  120,214, 1403, CURRENT_TIMESTAMP()),
(2306, 'Bluetooth Earbuds',           'True wireless earbuds with case',       1999.00,  150,214, 1403, CURRENT_TIMESTAMP()),
(2307, 'Smart LED TV 43"',            '43-inch 4K smart LED TV',               32999.00, 20, 214, 1404, CURRENT_TIMESTAMP()),
(2308, 'Smart LED TV 55"',            '55-inch 4K smart LED TV',               49999.00, 15, 214, 1404, CURRENT_TIMESTAMP()),
(2309, 'Microwave Oven 23L',          '23L convection microwave oven',         10999.00, 25, 214, 1405, CURRENT_TIMESTAMP()),
(2310, 'Front Load Washing Machine',  '6kg front-load washing machine',        25999.00, 18, 214, 1405, CURRENT_TIMESTAMP());

INSERT INTO product_images (id, image_url, store_id, sort_order, product_id) VALUES
(3301, '/uploads/store-214/smartphone-x.jpg',     214, 0, 2301),
(3302, '/uploads/store-214/smartphone-y.jpg',     214, 0, 2302),
(3303, '/uploads/store-214/laptop-pro-14.jpg',    214, 0, 2303),
(3304, '/uploads/store-214/laptop-air-13.jpg',    214, 0, 2304),
(3305, '/uploads/store-214/wireless-headphones.jpg', 214, 0, 2305),
(3306, '/uploads/store-214/earbuds.jpg',          214, 0, 2306),
(3307, '/uploads/store-214/smart-tv-43.jpg',      214, 0, 2307),
(3308, '/uploads/store-214/smart-tv-55.jpg',      214, 0, 2308),
(3309, '/uploads/store-214/microwave-23l.jpg',    214, 0, 2309),
(3310, '/uploads/store-214/washing-machine.jpg',  214, 0, 2310);

------------------------------------------------------------
-- INVENTORY SERVICE: INVENTORY
-- One row per product (simple mapping)
------------------------------------------------------------
DELETE FROM inventory;

INSERT INTO inventory (id, product_id, available_quantity, store_id, created_at, updated_at) VALUES
-- Flower store inventory
(4001, 2001, 100, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4002, 2002,  60, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4003, 2003,  80, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4004, 2004,  50, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4005, 2005,  70, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4006, 2006,  40, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4007, 2007,  30, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4008, 2008,  80, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4009, 2009,  25, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4010, 2010,  45, 211, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),

-- Medical store
(4101, 2101, 500, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4102, 2102, 400, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4103, 2103, 300, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4104, 2104, 200, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4105, 2105, 200, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4106, 2106,  80, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4107, 2107, 120, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4108, 2108, 250, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4109, 2109, 200, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4110, 2110, 150, 212, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),

-- Grocery
(4201, 2201, 120, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4202, 2202, 100, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4203, 2203, 200, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4204, 2204, 150, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4205, 2205, 180, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4206, 2206, 160, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4207, 2207, 130, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4208, 2208,  90, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4209, 2209,  70, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4210, 2210, 100, 213, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),

-- Electronics
(4301, 2301, 50, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4302, 2302, 80, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4303, 2303, 30, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4304, 2304, 40, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4305, 2305,120, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4306, 2306,150, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4307, 2307, 20, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4308, 2308, 15, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4309, 2309, 25, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4310, 2310, 18, 214, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

------------------------------------------------------------
-- ORDER SERVICE: SAMPLE ORDERS + ITEMS
------------------------------------------------------------
DELETE FROM order_items;
DELETE FROM orders;

-- 2 orders per store for analytics

-- Flower store orders (store_id = 211)
INSERT INTO orders (id, user_id, store_id, total_amount, status, created_at, updated_at)
VALUES
(5001, 3, 211, 799.00, 'DELIVERED',  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(5002, 3, 211, 1798.00,'SHIPPED',    CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO order_items (id, product_id, quantity, price, store_id, order_id) VALUES
(5101, 2001, 1, 799.00, 211, 5001),
(5102, 2002, 1, 999.00, 211, 5002),
(5103, 2008, 1, 649.00, 211, 5002);

-- Medical store orders (store_id = 212)
INSERT INTO orders (id, user_id, store_id, total_amount, status, created_at, updated_at)
VALUES
(5003, 3, 212, 290.00, 'DELIVERED', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(5004, 3, 212, 748.00, 'PENDING',   CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO order_items (id, product_id, quantity, price, store_id, order_id) VALUES
(5201, 2101, 2, 35.00,  212, 5003),
(5202, 2103, 1, 110.00, 212, 5003),
(5203, 2104, 1, 199.00, 212, 5004),
(5204, 2105, 1, 249.00, 212, 5004),
(5205, 2108, 2, 149.00, 212, 5004);

-- Grocery store orders (store_id = 213)
INSERT INTO orders (id, user_id, store_id, total_amount, status, created_at, updated_at)
VALUES
(5005, 3, 213, 774.00, 'DELIVERED', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(5006, 3, 213, 879.00, 'INVENTORY_RESERVED', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO order_items (id, product_id, quantity, price, store_id, order_id) VALUES
(5301, 2201, 2, 60.00,  213, 5005),
(5302, 2209, 1, 599.00, 213, 5005),
(5303, 2203, 2, 72.00,  213, 5006),
(5304, 2210, 1, 155.00, 213, 5006),
(5305, 2205, 1, 99.00,  213, 5006);

-- Electronics store orders (store_id = 214)
INSERT INTO orders (id, user_id, store_id, total_amount, status, created_at, updated_at)
VALUES
(5007, 3, 214, 24999.00, 'DELIVERED', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(5008, 3, 214, 77997.00, 'PAYMENT_COMPLETED', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO order_items (id, product_id, quantity, price, store_id, order_id) VALUES
(5401, 2301, 1, 24999.00, 214, 5007),
(5402, 2303, 1, 74999.00, 214, 5008),
(5403, 2305, 1, 2999.00,  214, 5008);

------------------------------------------------------------
-- PAYMENT SERVICE: SAMPLE PAYMENTS
------------------------------------------------------------
DELETE FROM payments;

INSERT INTO payments (id, order_id, user_id, amount, status, transaction_id, store_id, created_at)
VALUES
(6001, 5001, 3,  799.00, 'SUCCESS', 'TXN-FLW-5001', 211, CURRENT_TIMESTAMP()),
(6002, 5003, 3,  290.00, 'SUCCESS', 'TXN-MED-5003', 212, CURRENT_TIMESTAMP()),
(6003, 5005, 3,  774.00, 'SUCCESS', 'TXN-GRC-5005', 213, CURRENT_TIMESTAMP()),
(6004, 5007, 3, 24999.00, 'SUCCESS', 'TXN-ELC-5007', 214, CURRENT_TIMESTAMP()),
(6005, 5008, 3, 77997.00, 'PENDING','TXN-ELC-5008', 214, CURRENT_TIMESTAMP());

------------------------------------------------------------
-- END OF SEED
------------------------------------------------------------
