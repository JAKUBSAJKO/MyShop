import { useState } from "react";
import Link from "next/link";

import AddProduct from "@/components/dashboard/AddProduct";
import DashboardWrapper from "@/components/DashboardWrapper";
import Nav from "@/components/dashboard/Nav";

import { dashboard } from "../../../constants";
import { Category } from "../../../types";
import { routes } from "../../../routes/routes";
import Modal from "@/components/Modal";

interface DashboardProps {
  categories: Category[];
}

export default function Dashboard({ categories }: DashboardProps) {
  const [title, setTitle] = useState("Strona główna");
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex">
      <div className="w-64 bg-gray-800 shadow-2xl flex flex-col">
        <div className="flex justify-center items-center my-12">
          <Link href={routes.home}>
            <h1 className="text-4xl text-white font-raleway font-bold">
              My Shop
            </h1>
          </Link>
        </div>
        <div>
          <Nav title={title} setTitle={setTitle} />
        </div>
      </div>
      <div className="flex-1 h-full w-auto flex flex-col">
        <div className="w-full h-16 bg-gray-800"></div>
        <div className="w-full h-full p-12 flex flex-col">
          <h2 className="text-2xl text-white font-raleway font-normal mb-4">
            {title}
          </h2>
          <DashboardWrapper>
            <button onClick={() => setOpenModal(true)}>Open</button>
            {openModal && (
              <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(!openModal)}
              >
                <div className="w-full h-full flex flex-col">
                  <h3>Test</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facilis, amet iure. Harum beatae praesentium cumque
                    provident eos earum similique quas officiis necessitatibus
                    hic sequi illo magnam, est omnis quod perferendis?
                  </p>
                </div>
              </Modal>
            )}
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
