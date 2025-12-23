-- ======================================================
-- EXTRA PRODUCT CATALOG SEEDING (beyond initial 10/store)
-- Expand products to ~35/store
-- ======================================================

---------------------- FLOWER STORE (211) ----------------------
INSERT INTO products (id, name, description, price, quantity, store_id, category_id, created_at) VALUES
(2011,'Orchid Bouquet', 'Exotic orchids for gifting', 1599.00,25,211,1103,CURRENT_TIMESTAMP()),
(2012,'White Lilies', 'Elegant white lilies', 1299.00,35,211,1103,CURRENT_TIMESTAMP()),
(2013,'Blue Orchid Bunch', 'Premium blue orchids', 1799.00,20,211,1103,CURRENT_TIMESTAMP()),
(2014,'Gerbera Bouquet', 'Mix gerberas for celebrations', 749.00,60,211,1101,CURRENT_TIMESTAMP()),
(2015,'Heart Shape Red Roses', 'Romantic premium flowers', 2499.00,15,211,1102,CURRENT_TIMESTAMP()),
(2016,'Tulip Basket', 'Imported tulips basket', 2299.00,18,211,1101,CURRENT_TIMESTAMP()),
(2017,'Love Combo Chocolate+Rose', 'Combo of rose & Ferrero', 1499.00,30,211,1105,CURRENT_TIMESTAMP()),
(2018,'Succulent Mini Plant', 'Cute desk succulent', 499.00,90,211,1104,CURRENT_TIMESTAMP()),
(2019,'Jade Plant Small', 'Lucky plant', 450.00,55,211,1104,CURRENT_TIMESTAMP()),
(2020,'Seasonal Flower Combo', 'Fresh seasonal blooms', 999.00,40,211,1101,CURRENT_TIMESTAMP()),
(2021,'Golden Money Plant', 'Indoor prosperity plant', 699.00,32,211,1104,CURRENT_TIMESTAMP()),
(2022,'Premium Flower Vase', 'Deluxe glass flowers', 1899.00,20,211,1101,CURRENT_TIMESTAMP()),
(2023,'Sweet Roses Chocolate Set', 'Roses with sweets', 999.00,22,211,1105,CURRENT_TIMESTAMP()),
(2024,'Purple Orchids Bunch', 'Stylish purple orchids', 1499.00,26,211,1103,CURRENT_TIMESTAMP()),
(2025,'LED Plant Pot Combo', 'Plant with LED lights', 899.00,28,211,1104,CURRENT_TIMESTAMP()),
(2026,'Mini Bonsai', 'Cute bonsai for decor', 1599.00,10,211,1104,CURRENT_TIMESTAMP()),
(2027,'Lily Rose Combo', 'Lily with roses bouquet', 1699.00,23,211,1101,CURRENT_TIMESTAMP()),
(2028,'Rose Teddy Combo', 'Rose bouquet with teddy', 1299.00,31,211,1105,CURRENT_TIMESTAMP()),
(2029,'Peace Lily', 'Indoor plant for peace', 699.00,44,211,1104,CURRENT_TIMESTAMP()),
(2030,'White Rose Bouquet', 'Purity white roses', 799.00,38,211,1102,CURRENT_TIMESTAMP());

INSERT INTO product_images (id, image_url, store_id, sort_order, product_id) VALUES
(3011,'/uploads/store-211/orchid.jpg',211,0,2011),
(3012,'/uploads/store-211/white-lily.jpg',211,0,2012),
(3013,'/uploads/store-211/blue-orchid.jpg',211,0,2013),
(3014,'/uploads/store-211/gerbera.jpg',211,0,2014),
(3015,'/uploads/store-211/heart-rose.jpg',211,0,2015),
(3016,'/uploads/store-211/tulip-basket.jpg',211,0,2016),
(3017,'/uploads/store-211/love-combo.jpg',211,0,2017),
(3018,'/uploads/store-211/succulent.jpg',211,0,2018),
(3019,'/uploads/store-211/jade.jpg',211,0,2019),
(3020,'/uploads/store-211/seasonal.jpg',211,0,2020),
(3021,'/uploads/store-211/gold-money.jpg',211,0,2021),
(3022,'/uploads/store-211/premium-vase.jpg',211,0,2022),
(3023,'/uploads/store-211/sweet-rose.jpg',211,0,2023),
(3024,'/uploads/store-211/purple-orchid.jpg',211,0,2024),
(3025,'/uploads/store-211/led-pot.jpg',211,0,2025),
(3026,'/uploads/store-211/bonsai.jpg',211,0,2026),
(3027,'/uploads/store-211/lily-rose.jpg',211,0,2027),
(3028,'/uploads/store-211/rose-teddy.jpg',211,0,2028),
(3029,'/uploads/store-211/peace-lily.jpg',211,0,2029),
(3030,'/uploads/store-211/white-rose.jpg',211,0,2030);

---------------------- MEDICAL STORE (212) ----------------------
INSERT INTO products (id,name,description,price,quantity,store_id,category_id,created_at) VALUES
(2111,'Pain Relief Gel', 'Fast muscle relief gel', 129.00,200,212,1201,CURRENT_TIMESTAMP()),
(2112,'Anti-Allergy Tablets', 'Seasonal allergies relief', 99.00,300,212,1202,CURRENT_TIMESTAMP()),
(2113,'Vitamin D Capsules', 'Bone health support', 299.00,150,212,1203,CURRENT_TIMESTAMP()),
(2114,'Medical Cotton Roll', 'Sterile cotton', 75.00,180,212,1204,CURRENT_TIMESTAMP()),
(2115,'Band-Aid Pack', 'Wound bandages', 45.00,500,212,1204,CURRENT_TIMESTAMP()),
(2116,'Skin Care Cream', 'Dermatalogically tested', 199.00,160,212,1205,CURRENT_TIMESTAMP()),
(2117,'Hair Strength Shampoo', 'Anti-hairfall', 249.00,110,212,1205,CURRENT_TIMESTAMP()),
(2118,'Face Mask Pack', 'Protection mask', 99.00,300,212,1205,CURRENT_TIMESTAMP()),
(2119,'ORS Hydration Drink', 'Hydration booster', 35.00,350,212,1202,CURRENT_TIMESTAMP()),
(2120,'Antacid Syrup', 'Acidity relief', 85.00,250,212,1202,CURRENT_TIMESTAMP()),
(2121,'Cough Drops (Pack)', 'Throat soothing drops', 65.00,320,212,1202,CURRENT_TIMESTAMP()),
(2122,'Adult Diapers Pack', 'Incontinence care', 499.00,90,212,1204,CURRENT_TIMESTAMP()),
(2123,'Eye Drops', 'Dry eye relief', 180.00,140,212,1205,CURRENT_TIMESTAMP()),
(2124,'Burn Cream', 'Burn wound care', 149.00,85,212,1204,CURRENT_TIMESTAMP()),
(2125,'Hand Wash 500 ml', 'Liquid hand wash', 120.00,210,212,1205,CURRENT_TIMESTAMP());

INSERT INTO product_images (id,image_url,store_id,sort_order,product_id) VALUES
(3111,'/uploads/store-212/pain-gel.jpg',212,0,2111),
(3112,'/uploads/store-212/anti-allergy.jpg',212,0,2112),
(3113,'/uploads/store-212/vitamin-d.jpg',212,0,2113),
(3114,'/uploads/store-212/cotton-roll.jpg',212,0,2114),
(3115,'/uploads/store-212/band-aid.jpg',212,0,2115),
(3116,'/uploads/store-212/skin-cream.jpg',212,0,2116),
(3117,'/uploads/store-212/shampoo.jpg',212,0,2117),
(3118,'/uploads/store-212/mask-pack.jpg',212,0,2118),
(3119,'/uploads/store-212/ors.jpg',212,0,2119),
(3120,'/uploads/store-212/antacid.jpg',212,0,2120),
(3121,'/uploads/store-212/cough-drops.jpg',212,0,2121),
(3122,'/uploads/store-212/diapers.jpg',212,0,2122),
(3123,'/uploads/store-212/eye-drops.jpg',212,0,2123),
(3124,'/uploads/store-212/burn-cream.jpg',212,0,2124),
(3125,'/uploads/store-212/hand-wash.jpg',212,0,2125);

---------------------- GROCERY STORE (213) ----------------------
INSERT INTO products (id,name,description,price,quantity,store_id,category_id,created_at) VALUES
(2211,'Apple (1 kg)', 'Fresh apples', 120.00,90,213,1301,CURRENT_TIMESTAMP()),
(2212,'Carrots (1 kg)', 'Organic carrots', 60.00,80,213,1301,CURRENT_TIMESTAMP()),
(2213,'Paneer (200 g)', 'Fresh dairy paneer', 89.00,150,213,1302,CURRENT_TIMESTAMP()),
(2214,'Cheese Slice Pack', 'Processed cheese', 140.00,120,213,1302,CURRENT_TIMESTAMP()),
(2215,'Nacho Chips', 'Corn nachos snack', 85.00,170,213,1303,CURRENT_TIMESTAMP()),
(2216,'Fruit Juice Pack', 'Multi-fruit juice', 105.00,130,213,1304,CURRENT_TIMESTAMP()),
(2217,'Green Tea Box', 'Healthy beverage', 179.00,70,213,1304,CURRENT_TIMESTAMP()),
(2218,'Wheat Flour (5 kg)', 'Fresh chakki atta', 219.00,60,213,1305,CURRENT_TIMESTAMP()),
(2219,'Cooking Salt (1 kg)', 'Iodized salt', 25.00,200,213,1305,CURRENT_TIMESTAMP()),
(2220,'Ghee (500 ml)', 'Pure cow ghee', 349.00,80,213,1305,CURRENT_TIMESTAMP()),
(2221,'Cashews (500 g)', 'Premium quality', 599.00,50,213,1305,CURRENT_TIMESTAMP()),
(2222,'Cold Drink 750ml', 'Soft drink bottle', 45.00,180,213,1304,CURRENT_TIMESTAMP()),
(2223,'Choco Bar', 'Chocolate bar', 25.00,200,213,1303,CURRENT_TIMESTAMP()),
(2224,'Green Peas (1 kg)', 'Frozen peas', 95.00,70,213,1301,CURRENT_TIMESTAMP()),
(2225,'Strawberries (250 g)', 'Sweet berries', 119.00,50,213,1301,CURRENT_TIMESTAMP());

INSERT INTO product_images (id,image_url,store_id,sort_order,product_id) VALUES
(3211,'/uploads/store-213/apple.jpg',213,0,2211),
(3212,'/uploads/store-213/carrots.jpg',213,0,2212),
(3213,'/uploads/store-213/paneer.jpg',213,0,2213),
(3214,'/uploads/store-213/cheese.jpg',213,0,2214),
(3215,'/uploads/store-213/nachos.jpg',213,0,2215),
(3216,'/uploads/store-213/juice.jpg',213,0,2216),
(3217,'/uploads/store-213/green-tea.jpg',213,0,2217),
(3218,'/uploads/store-213/wheat-flour.jpg',213,0,2218),
(3219,'/uploads/store-213/salt.jpg',213,0,2219),
(3220,'/uploads/store-213/ghee.jpg',213,0,2220),
(3221,'/uploads/store-213/cashews.jpg',213,0,2221),
(3222,'/uploads/store-213/drink.jpg',213,0,2222),
(3223,'/uploads/store-213/choco-bar.jpg',213,0,2223),
(3224,'/uploads/store-213/peas.jpg',213,0,2224),
(3225,'/uploads/store-213/strawberries.jpg',213,0,2225);

---------------------- ELECTRONICS STORE (214) ----------------------
INSERT INTO products (id,name,description,price,quantity,store_id,category_id,created_at) VALUES
(2311,'Gaming Laptop 15"', 'High performance gaming laptop', 89999.00,20,214,1402,CURRENT_TIMESTAMP()),
(2312,'Portable Speaker', 'Bluetooth speaker', 1999.00,150,214,1403,CURRENT_TIMESTAMP()),
(2313,'Power Bank 10000mAh', 'Fast charging power bank', 1299.00,200,214,1403,CURRENT_TIMESTAMP()),
(2314,'USB-C Charger', 'Quick charge adapter', 999.00,180,214,1403,CURRENT_TIMESTAMP()),
(2315,'Smart Watch Pro', 'Fitness smart watch', 4999.00,70,214,1403,CURRENT_TIMESTAMP()),
(2316,'Noise Cancelling Headset','Premium audio headset', 6999.00,60,214,1403,CURRENT_TIMESTAMP()),
(2317,'DSLR Camera', 'Professional DSLR', 56999.00,12,214,1401,CURRENT_TIMESTAMP()),
(2318,'4K Action Camera', 'Sports action cam', 18999.00,25,214,1401,CURRENT_TIMESTAMP()),
(2319,'Air Purifier', 'HEPA air purifier', 9999.00,25,214,1405,CURRENT_TIMESTAMP()),
(2320,'Induction Cooktop', 'Smart cooking cooktop', 2999.00,50,214,1405,CURRENT_TIMESTAMP());

INSERT INTO product_images (id,image_url,store_id,sort_order,product_id) VALUES
(3311,'/uploads/store-214/gaming-laptop.jpg',214,0,2311),
(3312,'/uploads/store-214/speaker.jpg',214,0,2312),
(3313,'/uploads/store-214/powerbank.jpg',214,0,2313),
(3314,'/uploads/store-214/charger.jpg',214,0,2314),
(3315,'/uploads/store-214/smartwatch.jpg',214,0,2315),
(3316,'/uploads/store-214/noise-headset.jpg',214,0,2316),
(3317,'/uploads/store-214/dslr.jpg',214,0,2317),
(3318,'/uploads/store-214/action-cam.jpg',214,0,2318),
(3319,'/uploads/store-214/air-purifier.jpg',214,0,2319),
(3320,'/uploads/store-214/induction.jpg',214,0,2320);
