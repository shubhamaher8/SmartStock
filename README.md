# SmartStock - Inventory Management System

&nbsp;

## 🚀 Deployment

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://smart-stock-iota.vercel.app/)

[![Live Project](https://img.shields.io/badge/Live%20Project-smart--stock--iota.vercel.app-green?style=for-the-badge&logo=vercel)](https://smart-stock-iota.vercel.app/)


## 🖼️ Screenshot

<table>
  <tr>
    <td align="center">
      <img src="frontend/assets/dashboard.png" alt="Dashboard Screenshot" width="420"/>
      <br/>
      <b>SmartStock Dashboard</b>
    </td>
  </tr>
</table>

## ✨ Features

### 🎛️ **Dashboard & Analytics**
- 📊 Real-time statistics and metrics
- 📈 Sales overview with revenue tracking
- 🏆 Best-selling products analysis
- ⚠️ Low stock alerts and notifications
- 🔍 Defective products monitoring

### 📦 **Product Management**
- ➕ Add new products with detailed information
- ✏️ Edit and update product details
- ⭐ Product rating system
- 🏷️ Category and supplier management
- 📸 Product image support

### 🛒 **Order Management**
- 📋 Create and track purchase orders
- 📊 Order status monitoring
- 🔄 Order fulfillment tracking
- 📦 Inventory integration

### 💰 **Sales & Revenue**
- 💵 Record sales transactions
- 📊 Monthly and quarterly revenue reports
- 📈 Sales trend analysis
- 🎯 Performance metrics

### 👥 **Supplier Management**
- 🏢 Supplier information management
- 📋 Product-supplier relationships
- 📞 Contact information tracking

### 📋 **Reports & Analytics**
- 📊 Custom sales reports
- 📈 Data visualization
- 📅 Date range filtering
- 📤 Export capabilities


## 🛠️ Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


## 📦 Installation

### Prerequisites
- ⚡ Node.js (v14 or higher)
- 🍃 MongoDB (local or cloud instance)
- 📦 npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhamaher8/SmartStock.git
   cd SmartStock
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

The frontend is static and can be served via any static server:

```bash
cd frontend
# Use any static server like live-server, http-server, or deploy to Vercel
```


## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | 📦 Get all products |
| `POST` | `/api/products` | ➕ Create new product |
| `PUT` | `/api/products/:id` | ✏️ Update product |
| `DELETE` | `/api/products/:id` | 🗑️ Delete product |
| `GET` | `/api/inventory` | 📊 Get inventory status |
| `GET` | `/api/orders` | 📋 Get all orders |
| `POST` | `/api/orders` | ➕ Create new order |
| `GET` | `/api/sales` | 💰 Get sales data |
| `POST` | `/api/sales` | ➕ Record new sale |
| `GET` | `/api/suppliers` | 👥 Get suppliers |
| `GET` | `/api/statistics` | 📈 Get analytics |


## 🎯 Key Features

### 🎨 **Modern UI/UX**
- 🎯 Clean and intuitive interface
- 📱 Responsive design
- 🎨 Beautiful dashboard with charts
- ⚡ Fast and smooth interactions

### 🔒 **Data Management**
- 💾 MongoDB database integration
- 🔄 Real-time data synchronization
- 📊 Comprehensive CRUD operations
- 🛡️ Data validation and error handling

### 📈 **Analytics & Reporting**
- 📊 Sales performance metrics
- 📈 Revenue trend analysis
- 🏆 Best-selling product tracking
- ⚠️ Inventory alerts and notifications

### 🚀 **Performance**
- ⚡ Fast API responses
- 🔄 Efficient data queries
- 📦 Optimized frontend assets
- 🌐 CDN deployment via Vercel


## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b Feature`)
3. 💾 Commit your changes (`git commit -m 'Add some Feature'`)
4. 📤 Push to the branch (`git push origin Feature`)
5. 🔄 Open a Pull Request
