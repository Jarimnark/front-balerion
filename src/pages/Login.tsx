import { useAuth } from "@/context/authContext";
import React, { useState } from "react";
import { z } from "zod";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorsValidation, setErrorsValidation] = useState<{
    username?: string;
    password?: string;
  }>({});
  const { login, error } = useAuth();
  // const [loginError, setLoginError] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = LoginSchema.safeParse({ username, password });
    console.log("1", result);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrorsValidation({
        username: fieldErrors.username?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
    } else {
      setErrorsValidation({});
      login(username, password);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <h1>เข้าสู่ระบบ</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="username" className="text-xs font-normal">
            บัญชีพนักงาน
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="bg-[#393937] pt-2 pb-2.5 px-3 rounded-xl focus:outline-none"
          />
          {errorsValidation.username && (
            <p style={{ color: "red" }}>{errorsValidation.username}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="password" className="text-xs font-normal">
            รหัสผ่าน
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-[#393937] pt-2 pb-2.5 px-3 rounded-xl focus:outline-none"
          />
          {errorsValidation.password && (
            <p style={{ color: "red" }}>{errorsValidation.password}</p>
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          className="bg-white text-black rounded-[8px] h-[43px] hover:opacity-80 cursor-pointer"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};

export default Login;
