# Product Management System

**Created by: Amy Portillo**  
**Course: CS480 - Senior Project II**

A full-stack product management application with CRUD operations, image uploads, and dual view modes.

---

## Technology Stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS  
**Backend:** Express.js, TypeScript, MySQL, Sequelize ORM

---

## Setup Instructions

1. **Install Dependencies**

```bash
npm install
```

2. **Create MySQL Database**

```bash
mysql -u root -p
CREATE DATABASE productdb;
exit;
```

3. **Configure Backend** - Create `backend/.env`:

```env
PORT=5001
DATABASE_URL=mysql://root:your_password@localhost:3306/productdb
```

4. **Run Application**

```bash
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5001

---

## API Endpoints

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/products`     | Get all products   |
| GET    | `/products/:id` | Get single product |
| POST   | `/products`     | Create product     |
| PUT    | `/products/:id` | Update product     |
| DELETE | `/products/:id` | Delete product     |

---

**Amy Portillo** - CS480 Senior Project II
