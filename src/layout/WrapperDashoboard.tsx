import DashboardScreen from "@/components/DashboardScreen";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

interface WrapperDashoboardProps {
  children: ReactNode;
}

export default function WrapperDashoboard({ children }: WrapperDashoboardProps) {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex">
      <Sidebar />
      <DashboardScreen children={children} />
    </div>
  );
}
