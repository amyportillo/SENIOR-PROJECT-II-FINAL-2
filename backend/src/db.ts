import { Sequelize } from "sequelize";
import { Product } from "./models/Product";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  logging: false, // Set to console.log to see SQL queries
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

// Seed initial products
async function seedProducts() {
  try {
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate([
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 199.99,
          description: "Noise-cancelling over-ear headphones with 40-hour battery life.",
          category: "Electronics",
          image: "",
        },
        {
          id: 2,
          name: "Organic Coffee Beans - 1lb",
          price: 14.5,
          description: "Medium roast, single-origin beans from Ethiopia.",
          category: "Groceries",
          image: "",
        },
        {
          id: 3,
          name: "Ergonomic Office Chair",
          price: 349.95,
          description: "High-back mesh chair with adjustable lumbar support.",
          category: "Furniture",
          image: "",
        },
        {
          id: 4,
          name: "Stainless Steel Water Bottle",
          price: 25.0,
          description: "32oz insulated bottle, keeps drinks cold for 24 hours.",
          category: "Accessories",
          image: "",
        },
        {
          id: 5,
          name: "Portable Bluetooth Speaker",
          price: 75.49,
          description: "Compact speaker with powerful bass and IPX7 waterproof rating.",
          category: "Electronics",
          image: "",
        },
      ]);
      console.log("Database seeded with 5 initial products.");
    }
  } catch (error) {
    console.error("Failed to seed products:", error);
  }
}

// Initialize database - sync all models
async function initializeDatabase() {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
    await seedProducts();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export { sequelize, initializeDatabase };
