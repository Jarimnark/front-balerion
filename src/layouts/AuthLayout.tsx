import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white overflow-y-auto">
      <Outlet /> {/* This renders child routes */}
    </div>
  );
};

export default AuthLayout;
