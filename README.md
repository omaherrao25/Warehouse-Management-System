# 🏭 Warehouse Management System

This project implements a Warehouse Management System using **webMethods Integration Server**. It covers API creation, data validation, and interaction with the backend database to manage orders, products, and shipping information.

## 📌 Project Overview

This system was developed as part of a use case provided during **webMethods training at VKraft Software Solutions**.

### 💡 Features

- API integration using webMethods
- Input validation (mandatory fields, order number, product name, shipping date)
- Persistent storage to the database
- Modular design separating concerns of Order, Product, and Shipping entities

## 🔧 Implemented APIs

| API Name                   | Description                           |
|---------------------------|---------------------------------------|
| `getAllOrders`            | Fetches all orders                    |
| `getOrderByOrderId`       | Fetches specific order by ID          |
| `getAllProducts`          | Fetches all products                  |
| `getProductByProductId`   | Fetches specific product by ID        |
| `getAllShipping`          | Fetches all shipping entries          |
| `getShippingByShippingId`| Fetches specific shipping info by ID  |

## 🛠 Technologies Used

- **webMethods Integration Server**
- **Software AG Designer**
- **Oracle Database**
- **HTML/CSS/JavaScript**
- **GitHub** for version control and collaboration
