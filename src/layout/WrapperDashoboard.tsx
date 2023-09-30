import DashboardScreen from "@/components/DashboardScreen";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

interface WrapperDashoboardProps {
  children: ReactNode;
}

export default function WrapperDashoboard({ children }: WrapperDashoboardProps) {
  const [hideContent, setHideContent] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      <Sidebar />
      <Navbar inDashboard={true} setHideContent={setHideContent} />
      <DashboardScreen children={children} hideContent={hideContent} />
    </div>
  );
}
