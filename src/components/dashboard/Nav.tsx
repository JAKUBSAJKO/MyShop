import Link from "next/link";
import { dashboardList } from "../../../constants";
import { useDashboardTitle } from "../../../stories/title";

interface NavProps {
  inDashboard?: boolean;
}

export default function Nav({ inDashboard }: NavProps) {
  const title = useDashboardTitle((set) => set.title);
  const changeTitle = useDashboardTitle((set) => set.changeTitle);

  return (
    <ul className={`w-full flex flex-col gap-2 ${inDashboard && "h-full px-6 py-12"}`}>
      {dashboardList.map((item) => (
        <Link key={item.id} href={item.route}>
          <li
            className={`py-4 px-4 rounded-lg flex items-center gap-4 hover:bg-gray-900 cursor-pointer ${
              title === item.title ? "bg-orange-500 text-white" : "text-gray-400"
            }`}
            onClick={() => changeTitle(item.title)}
            key={item.title}
          >
            <>{<item.icon className="w-5 h-5" />}</>
            <p className="font-raleway font-medium">{item.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
