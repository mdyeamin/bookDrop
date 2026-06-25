# 📚 BookDrop – Online Book Delivery Management System

BookDrop is a full-stack web application that connects readers, students, librarians, and book owners on a single platform. Users can browse books, request home delivery, track delivery status, and leave reviews. Librarians can manage their inventory and delivery requests, while admins oversee users, books, and platform activities.

## 🌐 Live Website

🚀 Live Site: :contentReference[oaicite:0]{index=0}

## 🔗 Repositories

### Client Side
:contentReference[oaicite:1]{index=1}

### Server Side
:contentReference[oaicite:2]{index=2}

---

## 🎯 Project Purpose

The goal of BookDrop is to make books more accessible by allowing users to discover and receive books without visiting a physical library. The platform provides a smooth and secure experience for readers while helping librarians manage their collections and delivery operations efficiently.

---

## ✨ Key Features

### 👤 Authentication & Authorization
- Email and password authentication
- Google login support
- Role-based access control (User, Librarian, Admin)
- Protected routes using JWT authentication

### 📚 Book Management
- Browse all available books
- Search, filter, and sort books
- View detailed book information
- Book cover image upload using ImgBB
- Publish and unpublish books

### 🚚 Delivery System
- Request book delivery
- Stripe payment integration for delivery fees
- Track delivery status:
  - Pending
  - Dispatched
  - Delivered

### ⭐ Review System
- Verified review system
- Only users with completed deliveries can leave reviews
- Edit and delete reviews

### 📊 Dashboard Features

#### User Dashboard
- Delivery history
- Reading list
- Review management
- Statistics and charts

#### Librarian Dashboard
- Add new books
- Manage inventory
- Manage delivery requests
- Earnings and analytics overview

#### Admin Dashboard
- Manage all users
- Approve or reject books
- Monitor transactions
- Platform analytics and reports

### 🎨 User Experience
- Fully responsive design
- Skeleton loading states
- Toast notifications
- Custom 404 page
- Modern dashboard UI
- Smooth animations with Framer Motion

---

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- HeroUI
- Framer Motion
- Recharts
- React Hook Form
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Better Auth
- Stripe Payment Gateway

### Other Services
- ImgBB Image Hosting
- Vercel Deployment

---

## 📦 NPM Packages Used

### Client
- next
- react
- react-dom
- @heroui/react
- framer-motion
- react-icons
- react-hook-form
- react-hot-toast
- recharts
- axios
- sweetalert2

### Server
- express
- mongodb
- cors
- dotenv
- jsonwebtoken
- stripe
- cookie-parser
- better-auth

---

## 🔐 Environment Variables

The following environment variables are used to keep sensitive information secure:

### Client
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
```

### Server
```env
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## 🚀 Installation

### Clone Client Repository

```bash
git clone https://github.com/mdyeamin/bookDrop.git
cd bookDrop
npm install
npm run dev
```

### Clone Server Repository

```bash
git clone https://github.com/mdyeamin/bookDrop-server.git
cd bookDrop-server
npm install
npm start
```

---

## 👨‍💻 Developer

**Md Yeamin**  
Junior Full Stack Web Developer

Focused on building modern, responsive, and user-friendly web applications using Next.js, MongoDB, Better Auth, Tailwind CSS, and modern web technologies.

---

## 📄 License

This project was developed for educational and portfolio purposes.