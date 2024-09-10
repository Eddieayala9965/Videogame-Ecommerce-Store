# Game Station 🎮

**Game Station** is a full-stack e-commerce platform designed for purchasing video games. It features a **Next.js** frontend with **Redux Toolkit** for state management and a **FastAPI** backend that interacts with a **PostgreSQL** database. The application allows users to browse a catalog of games using the **CheapShark API**, manage their cart, place orders, and view order history. The design is fully responsive, ensuring seamless use across various devices.

## Thumbnail

[![Home Thumbnail](https://github.com/Eddieayala9965/Videogame-Ecommerce-Store/blob/82072b6359e15801ccdf64953dd6e3fcc82a7c95/frontend/public/home.png)](https://drive.google.com/file/d/1HTMDcAOvG1XSTedW1nku6ewpXQ6tqR5O/view?usp=sharing)

Click the image to view more details.

## Project Structure

- **Frontend**: Built with **Next.js**, **Redux Toolkit**, and **Material-UI** for styling, with support for responsive design.
- **Backend**: Powered by **FastAPI**, with **SQLAlchemy** for ORM, **Alembic** for migrations, and **bcrypt** for secure password hashing. **JWT tokens** are used for authentication.
- **Database**: **PostgreSQL** is used for data persistence, managing user accounts, orders, and game catalog information.
- **Game Catalog**: Game information is fetched from the **CheapShark API**, allowing users to browse and add games to their cart.

---

## 🚀 Technologies

### Frontend

- **Next.js** (v14.2.5): A React framework for building fast, server-side rendered applications.
- **React** (v18): A JavaScript library for building user interfaces.
- **Redux Toolkit**: State management with easy-to-use features.
- **Axios**: For making API requests to the backend and external APIs.
- **Material-UI**: Component library for faster and easier UI development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Cookies**: Used for storing JWT tokens and session data on the frontend.
- **Responsive Design**: The app is designed to be fully responsive across all devices.

### Backend

- **FastAPI** (v0.112.0): Modern, fast web framework for building APIs with Python.
- **SQLAlchemy** (v2.0.32): ORM for PostgreSQL interactions.
- **Alembic** (v1.13.2): Database migration tool.
- **PostgreSQL**: Relational database used for storing user, order, and game catalog data.
- **bcrypt**: For password hashing and security.
- **JWT Tokens**: Used for user authentication and session management.
- **CheapShark API**: Integrated to provide game catalog data for the store.

---

## Features

### 🔐 Authentication & Security
- **User Authentication**: Secure user login and registration with hashed passwords using **bcrypt**.
- **JWT Tokens**: Used for secure session management and authentication.

### 🛒 E-commerce Functionality
- **Game Catalog**: Game information is pulled from the **CheapShark API** and added to the store's database.
- **Add to Cart**: Users can add games to their cart and place orders.
- **CRUD Operations**: Full **CRUD** (Create, Read, Update, Delete) functionality for managing games, users, and orders.
- **Order Placement**: Users can place orders after reviewing their cart.
- **Order History**: Users can view their order history with details about previous purchases.

### 🎨 Frontend Features
- **Responsive Design**: The entire frontend is responsive, ensuring smooth user experience across desktop, tablet, and mobile devices.
- **Material-UI Components**: Pre-built components for a consistent and modern UI.
