import express from "express";
import cors from "cors";
import config from "./config";
import productRoutes from "./routes/productRoutes";
import { initializeDatabase } from "./db";
import "./models/index"; // Import models to register them with Sequelize

const app = express();

const allowedOrigins = ["http://localhost:3000", config.clientUrl];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Rejected CORS origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  cors({
    origin: [config.clientUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/", productRoutes);

// Initialize database then start server
initializeDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
