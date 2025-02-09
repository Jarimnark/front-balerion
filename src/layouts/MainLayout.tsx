import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-black text-white">
      <Header />
      <div className="p-4">
        <Outlet /> {/* This renders child routes */}
      </div>
    </div>
  );
};

export default MainLayout;
