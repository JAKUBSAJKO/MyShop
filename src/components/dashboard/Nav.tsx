import { Dispatch, SetStateAction } from "react";

import { dashboardList } from "../../../constants";

interface NavProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function Nav({ title, setTitle }: NavProps) {
  return (
    <ul className="w-full flex flex-col gap-2 px-4">
      {dashboardList.map((element) => (
        <div
          className={`py-4 px-4 rounded-lg flex items-center gap-4 hover:bg-gray-900 cursor-pointer ${
            title === element.title
              ? "bg-orange-500 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setTitle(element.title)}
          key={element.title}
        >
          <>{<element.icon className="w-5 h-5" />}</>
          <p className="font-raleway font-medium">{element.title}</p>
        </div>
      ))}
    </ul>
  );
}
