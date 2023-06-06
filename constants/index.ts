import { FaHome, FaPlusCircle, FaTruck, FaClipboardList } from "react-icons/fa";

export const dashboard = {
  home: "Strona główna",
  addProduct: "Dodaj produkt",
  enterDelivery: "Wprowadź dostawę",
  allProducts: "Wszystkie produkty",
};

export const dashboardList = [
  { icon: FaHome, title: dashboard.home },
  { icon: FaPlusCircle, title: dashboard.addProduct },
  { icon: FaTruck, title: dashboard.enterDelivery },
  { icon: FaClipboardList, title: dashboard.allProducts },
];
