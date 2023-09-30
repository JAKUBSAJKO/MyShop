import { ReactNode } from "react";
import { useDashboardTitle } from "../../stories/title";

interface DashboardScreenProps {
  children: ReactNode;
}

export default function DashboardScreen({ children }: DashboardScreenProps) {
  const title = useDashboardTitle((set) => set.title);

  return (
    <div className="flex-1 h-full w-auto flex flex-col">
      <div className="w-full h-full flex flex-col lg:p-12">
        <h2 className="text-2xl text-white font-raleway font-normal my-4 pl-4 lg:pl-0">{title}</h2>
        {children}
      </div>
    </div>
  );
}
