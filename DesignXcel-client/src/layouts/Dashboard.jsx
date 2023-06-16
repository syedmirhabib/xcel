import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Helmet>
        <title> DesignXcel | Dashboard</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
