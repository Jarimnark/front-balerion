import { useAuth } from "@/context/authContext";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const { email, logout } = useAuth();
  return (
    <header className="flex justify-end items-center p-3 gap-4">
      <span className="text-2xl font-bold">{email}</span>
      <button
        onClick={() => {
          logout();
        }}
        className="text-3xl cursor-pointer hover:opacity-80"
      >
        <MdOutlineLogout />
      </button>
    </header>
  );
};

export default Header;
