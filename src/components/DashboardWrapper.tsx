import { ReactNode } from "react";

export default function DashboardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="bg-red-500">{children}</div>;
}
