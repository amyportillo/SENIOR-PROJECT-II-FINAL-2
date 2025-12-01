import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../db";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: number | null;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: string;
  declare image: string;
  declare imageUrl: string | null;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        const imagePath = this.getDataValue("image");
        if (!imagePath) return null;
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        return `${baseUrl}/uploads/${imagePath}`;
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
  }
);

export { Product };
