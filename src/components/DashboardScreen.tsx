import { ReactNode } from "react";
import { useDashboardTitle } from "../../stories/title";

interface DashboardScreenProps {
  children: ReactNode;
  hideContent: boolean;
}

export default function DashboardScreen({ children, hideContent }: DashboardScreenProps) {
  const title = useDashboardTitle((set) => set.title);

  return (
    <div className={`flex-1 h-full w-auto flex flex-col ${hideContent && "hidden"}`}>
      <div className="w-full h-full flex flex-col lg:p-12">
        <h2 className="text-2xl text-white font-raleway font-normal text-center mt-4 md:text-left md:my-4 md:pl-4 lg:pl-0">
          {title}
        </h2>
        <div className="w-[calc(100vw_-_32px)] h-[2px] bg-gray-500 mx-auto my-2 md:hidden"></div>
        {children}
      </div>
    </div>
  );
}
