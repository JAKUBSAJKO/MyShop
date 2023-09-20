import { ReactNode } from "react";
import { useDashboardTitle } from "../../stories/title";

interface DashboardScreenProps {
  children: ReactNode;
}

export default function DashboardScreen({ children }: DashboardScreenProps) {
  const title = useDashboardTitle((set) => set.title);

  return (
    <div className="flex-1 h-full w-auto mt-4 flex flex-col">
      <div className="w-full h-full p-12 flex flex-col">
        <h2 className="text-2xl text-white font-raleway font-normal mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
