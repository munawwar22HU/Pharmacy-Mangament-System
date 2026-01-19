# 🏥 Pharmacy Management System

Developed a full-stack web application for managing pharmacy operations with separate interfaces for administrators, pharmacists, managers, and customers. Built a comprehensive system enabling medicine inventory management, online ordering, user administration, and complaint handling through role-based access control and RESTful API architecture. Implemented dual Angular frontend applications supporting distinct workflows for admin and customer interfaces, with complete CRUD operations, shopping cart functionality, and file upload capabilities.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Backend:** Node.js • Express.js • MongoDB • Mongoose • Multer • RESTful API  
**Frontend:** Angular 9 • TypeScript • RxJS • Angular Router

## Key Challenges

• Implementing role-based access control across multiple user types  
• Managing state and data flow between dual frontend applications  
• File upload handling for user profiles and medicine images  
• Cart management and order processing workflow  
• MongoDB schema design for nested user data (cart, shipping, payment)

## Key Outcomes

✓ 4 distinct user roles implemented (Admin, Pharmacist, Manager, Customer)  
✓ 8 RESTful API route modules with role-based authentication  
✓ Dual frontend applications supporting separate admin and customer workflows  
✓ Complete CRUD operations for medicine inventory management  
✓ Shopping cart and order processing system with checkout functionality  
✓ File upload system for user profiles and medicine images  
✓ Complaint management system for customer support  
✓ MongoDB integration with 5 data models (User, Medicine, Order, Complain, Log)

---

## Project Structure

```
Pharmacy-Management-System/
├── Server/              # Node.js/Express backend
│   ├── api/
│   │   ├── models/      # MongoDB schemas
│   │   └── routes/      # API endpoints
│   └── index.js         # Server entry point
├── AdminFrontEnd/        # Angular admin interface (Port 4201)
└── CustomerFrontEnd/     # Angular customer interface (Port 4202)
```

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Angular CLI (v9.x)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pharmacy-Mangament-System
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Server
   npm install
   ```

3. **Install Admin Frontend Dependencies**
   ```bash
   cd ../AdminFrontEnd/Frontend
   npm install
   ```

4. **Install Customer Frontend Dependencies**
   ```bash
   cd ../../CustomerFrontEnd/FrontEnd
   npm install
   ```

5. **Configure MongoDB Connection**
   - Update the MongoDB connection string in `Server/connection.js`
   - Replace the URI with your MongoDB Atlas connection string or local MongoDB URI

### Running the Project

1. **Start the Backend Server**
   ```bash
   cd Server
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the Admin Frontend** (in a new terminal)
   ```bash
   cd AdminFrontEnd/Frontend
   npm start
   ```
   Admin interface will be available at `http://localhost:4201`

3. **Start the Customer Frontend** (in a new terminal)
   ```bash
   cd CustomerFrontEnd/FrontEnd
   npm start
   ```
   Customer interface will be available at `http://localhost:4202`

### Default Ports

- Backend API: `3000`
- Admin Frontend: `4201`
- Customer Frontend: `4202`

### Note for Windows Users

The Angular start scripts include `set NODE_OPTIONS=--openssl-legacy-provider` for compatibility. If you encounter OpenSSL errors, ensure you're using Node.js v12-v16 or adjust the NODE_OPTIONS accordingly.
