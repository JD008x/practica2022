require("dotenv").config();

export const env = {
  DATABASE_URL:
    process.env.DATABASE_URL ?? "mongodb://localhost:27017/Inventory",
  INVENTORY_MANAGEMENT: "inventory",
  LOCATION_MANAGEMENT: "location",
  PORT: 3000
};
