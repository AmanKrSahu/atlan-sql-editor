import { Grid2X2 } from "lucide-react";

export const sidebarTable = {
  tables: [
    {
      title: "categories",
      icon: Grid2X2,
      items: {
        categoryID: "int",
        description: "string",
        name: "string",
      },
    },
    {
      title: "products",
      icon: Grid2X2,
      items: {
        productID: "int",
        supplierID: "int",
        categoryID: "int",
        quantityPerUnit: "string",
        unitPrice: "int",
        unitsInStock: "int",
        unitsOnOrder: "int",
        reorderLevel: "int",
        discontinued: "boolean",
        name: "string",
      },
    },
    {
      title: "shippers",
      icon: Grid2X2,
      items: {
        shipperID: "int",
        companyName: "string",
        phone: "string",
      },
    },
  ],
};
