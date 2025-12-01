# Backend

Product management API built with Express and TypeScript.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables (create `.env` file):

```env
PORT=5000
DATABASE_URL=mysql://username:password@localhost:3306/database_name
NODE_ENV=development
```

3. Run the development server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server

## Tech Stack

- Express.js
- TypeScript
- Sequelize (MySQL)
- Multer (file uploads)
