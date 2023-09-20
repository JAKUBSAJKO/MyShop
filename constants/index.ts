import { FaClipboardList, FaHome, FaPlusCircle, FaTruck } from "react-icons/fa";
import { routes } from "../routes/routes";

export const dashboard = {
  home: "Strona główna",
  addProduct: "Dodaj produkt",
  enterDelivery: "Wprowadź dostawę",
  allProducts: "Wszystkie produkty",
};

export const dashboardList = [
  { id: 1, icon: FaHome, title: dashboard.home, route: routes.dashboard },
  { id: 2, icon: FaPlusCircle, title: dashboard.addProduct, route: routes.dashboardNewProduct },
  { id: 3, icon: FaTruck, title: dashboard.enterDelivery, route: routes.dashboardDelivery },
  { id: 4, icon: FaClipboardList, title: dashboard.allProducts, route: routes.dashboardProductsList },
];
