import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const { email, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex justify-end items-center p-3 gap-4 fixed w-full bg-black z-10">
      <span className="text-3xl font-semibold">{email}</span>
      <button
        onClick={() => {
          // logout();
          setIsOpen(true);
        }}
        className="text-3xl cursor-pointer hover:opacity-80"
      >
        <MdOutlineLogout />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-lg font-semibold text-black">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
