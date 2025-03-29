import { Folder } from "lucide-react";

export const sidebarCollection = {
  collections: [
    {
      title: "categories",
      icon: Folder,
      type: "SELECT",
      items: {
        SELECT: "All Categories",
      },
    },
    {
      title: "products",
      icon: Folder,
      items: {
        SELECT: "All Products",
      },
    },
    {
      title: "shippers",
      icon: Folder,
      items: {
        SELECT: "All Shippers",
      },
    },
  ],
};
