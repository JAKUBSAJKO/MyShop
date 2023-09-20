import DashboardScreen from "@/components/DashboardScreen";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

interface WrapperDashoboardProps {
  children: ReactNode;
}

export default function WrapperDashoboard({ children }: WrapperDashoboardProps) {
  const [title, setTitle] = useState("Strona główna");

  return (
    <div className="w-full min-h-screen bg-gray-900 flex">
      <Sidebar title={title} setTitle={setTitle} />
      <DashboardScreen children={children} title={title} />
    </div>
  );
}
