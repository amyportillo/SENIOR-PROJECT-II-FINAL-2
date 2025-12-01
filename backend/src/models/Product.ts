import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../db";

// product model defines the structure of products in database
class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  // typescript types for all product fields
  declare id: number | null;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: string;
  declare image: string;
  declare imageUrl: string | null;
}

// tell sequelize what columns the product table should have
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // auto-increment id for each new product
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // name is required
    },
    description: {
      type: DataTypes.TEXT, // text allows long descriptions
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // decimal with 2 decimal places for money
      allowNull: false, // price is required
    },
    category: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING, // just stores filename, not the actual image
    },
    imageUrl: {
      type: DataTypes.VIRTUAL, // virtual field not stored in db
      get() {
        // create full url from filename whenever we access imageUrl
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
    tableName: "products", // actual table name in mysql
  }
);

export { Product };
