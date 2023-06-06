import { ReactNode } from "react";

export default function DashboardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="bg-gray-700 w-full h-full">{children}</div>;
}
