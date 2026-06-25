# BookDrop

BookDrop is a full-stack online book delivery platform that connects readers, librarians, and administrators in a single ecosystem. The platform allows users to browse books, request home delivery, track delivery status, and leave verified reviews. Librarians can manage their inventory and delivery requests, while administrators oversee users, books, approvals, and transactions.

## Live Project

**Live Website**
https://bookdrop-sepia.vercel.app

**Client Repository**
https://github.com/mdyeamin/bookDrop

**Server Repository**
https://github.com/mdyeamin/bookDrop-server

---

## Project Purpose

The purpose of BookDrop is to make books more accessible by bringing library and book delivery services online. Instead of visiting a physical library, users can explore available books, request delivery, and manage their reading activities from anywhere.

The project demonstrates modern full-stack development concepts including authentication, role-based authorization, payment integration, dashboard management, protected routes, and responsive user interfaces.

---

## Key Features

### Authentication & Authorization

* Email and password authentication
* Google sign-in support
* Role-based access control (User, Librarian, Admin)
* Protected routes using JWT

### Book Management

* Browse all published books
* Search and filter books by category and availability
* Detailed book information page
* Add, update, delete, publish, and unpublish books
* Image hosting through ImgBB

### Delivery System

* Request book delivery
* Stripe payment integration for delivery fees
* Delivery status tracking
* Delivery history management

### Review System

* Verified reviews for delivered books
* Ratings and comments
* Edit and delete review functionality

### Dashboard Features

* User Dashboard

  * Delivery history
  * Reading list
  * Review management
  * Statistics overview

* Librarian Dashboard

  * Inventory management
  * Delivery request management
  * Earnings and analytics

* Admin Dashboard

  * User management
  * Book approval system
  * Transaction monitoring
  * Platform analytics

### User Experience

* Fully responsive design
* Skeleton loading states
* Toast notifications
* Custom 404 page
* Framer Motion animations
* Modern dashboard layout

---

## Technologies Used

### Frontend

* Next.js
* React
* Tailwind CSS
* HeroUI
* Framer Motion
* Recharts
* React Hook Form
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Better Auth
* JWT
* Stripe

### Third-Party Services

* ImgBB
* Vercel

---

## NPM Packages Used

### Client

* next
* react
* react-dom
* @heroui/react
* framer-motion
* react-hook-form
* react-icons
* react-hot-toast
* recharts
* axios
* sweetalert2

### Server

* express
* mongodb
* cors
* dotenv
* jsonwebtoken
* cookie-parser
* stripe
* better-auth

---

## Environment Variables

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

## Installation

### Client

```bash
git clone https://github.com/mdyeamin/bookDrop.git
cd bookDrop
npm install
npm run dev
```

### Server

```bash
git clone https://github.com/mdyeamin/bookDrop-server.git
cd bookDrop-server
npm install
npm start
```

---

## Author

Md Yeamin

Junior Full Stack Web Developer focused on building responsive, scalable, and user-friendly web applications using modern JavaScript technologies.
