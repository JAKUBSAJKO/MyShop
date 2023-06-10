import { useState } from "react";

import AddProduct from "@/components/dashboard/AddProduct";
import DashboardWrapper from "@/components/DashboardWrapper";
import Nav from "@/components/dashboard/Nav";

import { dashboard } from "../../../constants";
import { Category } from "../../../types";

interface DashboardProps {
  categories: Category[];
}

export default function Dashboard({ categories }: DashboardProps) {
  const [title, setTitle] = useState("Strona główna");

  return (
    <div className="w-full h-screen bg-gray-900 flex">
      <div className="w-64 bg-gray-800 shadow-2xl flex flex-col">
        <div className="flex justify-center items-center my-12">
          <h1 className="text-4xl text-white font-raleway font-bold">
            My Shop
          </h1>
        </div>
        <div>
          <Nav title={title} setTitle={setTitle} />
        </div>
      </div>
      <div className="flex-1 h-full w-auto flex flex-col">
        <div className="w-full h-16 bg-gray-800"></div>
        <div className="w-full h-full p-8 flex flex-col">
          <h2 className="text-2xl text-white font-raleway font-normal mb-4">
            {title}
          </h2>
          <DashboardWrapper>
            {title === dashboard.home ? (
              <div>
                <h2>Strona główna</h2>
              </div>
            ) : title === dashboard.addProduct ? (
              <AddProduct categories={categories} />
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
