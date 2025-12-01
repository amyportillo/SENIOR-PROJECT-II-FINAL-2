import "dotenv/config";

interface Config {
  port: number;
  dbUri: string;
  nodeEnv: string;
  clientUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  dbUri: process.env.DATABASE_URL || "sqlite::memory:",
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};

export default config;
