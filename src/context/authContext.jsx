import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000/api/v1/user";

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [UserId, setUserId] = useState(Cookies.get("userId") || null);

  const SignUp = async (data) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  };

  const SignIn = async (data) => {
    console.log(data);
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  };

  const LogOut = async () => {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    await res.json();

    Cookies.remove("token");
    Cookies.remove("id");

    toast.success("User Log-Out Successfully...");
  };

  //   useEffect(() => {
  //     const fetCurrentUser = async () => {
  //       const res = await fetch(`${import.meta.env.VITE_URL}/auth/crnt-usr`, {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const result = await res.json();

  //       console.log("result", result);

  //       if (result.success) {
  //         setUser(result.data);
  //       }
  //     };

  //     fetCurrentUser();
  //   }, [token]);

  return (
    <AuthContext.Provider
      value={{ SignUp, SignIn, token, setToken, UserId, setUserId, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthContext");

  return context;
};
