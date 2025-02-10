import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Auth {
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  email: string;
  role: "ADMIN" | "USER" | null;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isPopupVisible: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth";
const EMAIL_KEY = "email";
const ROLE_KEY = "role";

// const mockTokens = {
//   admin:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbi5lbWFpbEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifQ.91VaQcMDdRWOj849ddLZO7pR_qjl_DpHdaaYCYfakkg",
//   user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIuZW1haWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIifQ.IgQln56kjBGc66IAjRMjeJtscM2u--Uz5Ul01r1f874",
// };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = sessionStorage.getItem(STORAGE_KEY);
    const storedEmail = sessionStorage.getItem(EMAIL_KEY);
    const storedRole = sessionStorage.getItem(ROLE_KEY) as
      | "ADMIN"
      | "USER"
      | null;
    if (storedToken && storedEmail && storedRole) {
      // setToken(storedToken);
      setEmail(storedEmail);
      setRole(storedRole);
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  const setInfo = (tokenInput: string) => {
    const auth: Auth = jwtDecode(tokenInput);
    // setToken(tokenInput);
    sessionStorage.setItem(STORAGE_KEY, tokenInput);
    setEmail(auth.email);
    sessionStorage.setItem(EMAIL_KEY, auth.email);
    setRole(auth.role);
    sessionStorage.setItem(ROLE_KEY, auth.role);
    setError(null);
  };

  const login = async (username: string, password: string) => {
    try {
      console.log("login");
      console.log({ username, password });
      const res = await axios.post("http://exampleapi.com/api/v1/auth/login", {
        username,
        password,
      });
      console.log(res);

      const tokenReceive = res.data.token;
      setInfo(tokenReceive);
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setError("Wrong username or password");
    }

    // if (username === "admin1" && password === "1234") {
    //   setInfo(mockTokens.admin);
    //   navigate("/");
    // } else if (username === "user1" && password === "1234") {
    //   setInfo(mockTokens.user);
    //   navigate("/");
    // } else {
    //   setError("Wrong username or password");
    // }
  };
  const logout = () => {
    // setToken("");
    setEmail("");
    setRole(null);
    setError(null);
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(ROLE_KEY);
    navigate("/auth/login");
  };
  return (
    <AuthContext.Provider
      value={{ email, role, error, login, logout, isPopupVisible }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
