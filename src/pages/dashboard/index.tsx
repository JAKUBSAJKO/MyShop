import { useState } from "react";

import DashboardWrapper from "@/components/DashboardWrapper";
import { dashboard } from "../../../constants";

const nav = [
  { icon: "A", title: dashboard.home },
  { icon: "B", title: dashboard.addProduct },
  { icon: "C", title: dashboard.enterDelivery },
  { icon: "D", title: dashboard.allProducts },
];

export default function Dashboard() {
  const [title, setTitle] = useState("Strona główna");

  return (
    <div className="w-full h-screen grid grid-cols-[280px,1fr] grid-rows-[96px,1fr]">
      <div className="flex justify-center items-center border-r-2 border-nav-grey">
        <h1 className="text-4xl text-white font-raleway font-bold">My Shop</h1>
      </div>
      <div className="text-2xl text-white font-raleway font-normal px-16 flex items-center">
        {title}
      </div>
      <div>
        <ul className="w-full h-full border-r-2 border-nav-grey">
          {nav.map((element) => (
            <div
              className={`flex gap-4 pl-12 py-4  text-white font-raleway cursor-pointer hover:bg-orange-400 ${
                title === element.title ? "bg-orange-600" : "bg-orange-500"
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
  );
}
