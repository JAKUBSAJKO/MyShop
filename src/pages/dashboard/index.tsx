import { useState } from "react";
import { useQuery } from "react-query";

import DashboardWrapper from "@/components/DashboardWrapper";
import AddProduct from "@/components/dashboard/AddProduct";
import AllProducts from "@/components/dashboard/AllProducts";
import AddProductModal from "@/components/modals/AddProductModal";

import Sidebar from "@/components/Sidebar";
import Delivery from "@/components/dashboard/Delivery";
import Home from "@/components/dashboard/Home";
import { dashboard } from "../../../constants";
import { getProducts } from "../../../services/services";
import { Category, Product } from "../../../types";

interface DashboardProps {
  categories: Category[];
}

export default function Dashboard({ categories }: DashboardProps) {
  const [title, setTitle] = useState("Strona główna");
  const [openModal, setOpenModal] = useState(false);

  const { data: products } = useQuery<Product[]>("products", getProducts);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex">
      <Sidebar title={title} setTitle={setTitle} />
      <div className="flex-1 h-full w-auto mt-4 flex flex-col">
        <div className="w-full h-full p-12 flex flex-col">
          <h2 className="text-2xl text-white font-raleway font-normal mb-4">{title}</h2>
          <DashboardWrapper>
            {openModal && (
              <AddProductModal isOpen={openModal} handleClose={() => setOpenModal(!openModal)} setTitle={setTitle} />
            )}
            {title === dashboard.home ? (
              <Home />
            ) : title === dashboard.addProduct ? (
              <AddProduct categories={categories} setOpenModal={setOpenModal} />
            ) : title === dashboard.enterDelivery ? (
              <Delivery products={products} />
            ) : title === dashboard.allProducts ? (
              <AllProducts products={products} />
            ) : null}
          </DashboardWrapper>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products/category");
  const categories = await res.json();

  return {
    props: {
      categories,
    },
  };
}
