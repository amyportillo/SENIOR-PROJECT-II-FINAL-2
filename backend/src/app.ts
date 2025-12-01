import express from "express";
import cors from "cors";
import config from "./config";
import productRoutes from "./routes/productRoutes";
import { initializeDatabase } from "./db";
import "./models/index"; // import models so sequelize knows about them

// create the express app
const app = express();

// allow frontend to talk to backend from different port
const allowedOrigins = ["http://localhost:3000", config.clientUrl];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming origin:", origin);
      // check if request is from allowed origin
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

// additional cors config for specific methods
app.use(
  cors({
    origin: [config.clientUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// parse json request bodies
app.use(express.json());
// serve uploaded images as static files
app.use("/uploads", express.static("uploads"));
// attach product routes
app.use("/", productRoutes);

// connect to database first, then start listening for requests
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
