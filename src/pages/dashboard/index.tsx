import { useState } from "react";

import { dashboard } from "../../../constants";
import DashboardWrapper from "@/components/DashboardWrapper";

const nav = [
  { icon: "A", title: dashboard.home },
  { icon: "B", title: dashboard.addProduct },
  { icon: "C", title: dashboard.enterDelivery },
  { icon: "D", title: dashboard.allProducts },
];

export default function Dashboard() {
  const [title, setTitle] = useState("Strona główna");
  return (
    <div className="w-full h-screen bg-gray-900 flex">
      <div className="w-60 bg-gray-800 shadow-2xl flex flex-col">
        <div className="flex justify-center items-center my-12">
          <h1 className="text-4xl text-white font-raleway font-bold">
            My Shop
          </h1>
        </div>
        <div>
          <ul className="w-full flex flex-col gap-4 px-4">
            {nav.map((element) => (
              <div
                className={`py-3 px-4 rounded-lg flex items-center gap-4 hover:bg-gray-900 cursor-pointer ${
                  title === element.title
                    ? "bg-orange-500 text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setTitle(element.title)}
                key={element.title}
              >
                <p>{element.icon}</p>
                <p>{element.title}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 h-full w-auto flex flex-col">
        <div className="w-full h-16 bg-gray-800"></div>
        <div className="w-full h-full p-8 flex flex-col">
          <h2 className="text-2xl text-white font-raleway font-normal mb-4">
            {title}
          </h2>
          {/* <div className="bg-gray-600 w-full h-full"></div> */}
          <DashboardWrapper>
            {title === dashboard.home ? (
              <div>
                <h2>Strona główna</h2>
              </div>
            ) : title === dashboard.addProduct ? (
              <div>
                <h2>Dodaj produkt</h2>
              </div>
            ) : null}
          </DashboardWrapper>
        </div>
      </div>
    </div>
  );
}
