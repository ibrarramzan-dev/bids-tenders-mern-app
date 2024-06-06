import { Montserrat } from "next/font/google";
import DashboardMenu from "./DashboardMenu";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

export default function DashboardLayout({ dashboardMenu, children }) {
  return (
    <div className={`DashboardLayout ${montserrat.className}`}>
      <div className="DashboardLayout-DashboardMenu-wrapper">
        <DashboardMenu menu={dashboardMenu} />
      </div>

      <div className="DashboardLayout-DashboardMenu-mobile-wrapper">
        <DashboardMenu menu={dashboardMenu} />
      </div>

      <div className="DashboardLayout-content">{children}</div>
    </div>
  );
}
