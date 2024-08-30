/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000/api/v1/user";

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [UserId, setUserId] = useState(Cookies.get("userId") || null);
  const [currentState, setCurrentState] = useState("START_GAME");
  const [slotGameState, setSlotGameState] = useState(null);

  const [currentGameAmount, setCurrentGameAmount] = useState(null);
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
    Cookies.remove("userId");

    toast.success("User Log-Out Successfully...");
  };

  const getUser = () => {
    const userData = Cookies.get("userId");

    return userData ? JSON.parse(userData) : "";
  };

  const setGameState = (data) => {
    console.log("setGameState", data);
    setCurrentState(data);

    Cookies.set("userState", data);
  };

  const getGameState = () => {
    const data = Cookies.get("userState");
    console.log("getGameState", data);

    return data ? data : "";
  };

  const setWinState = (data) => {
    setSlotGameState(data);

    Cookies.set("slotGameState", JSON.stringify(data));
  };

  const getWinState = () => {
    const data = Cookies.get("slotGameState");

    return slotGameState ? JSON.parse(slotGameState) : JSON.parse(data);
  };

  const addBalance = async (data) => {
    // const res = await fetch(`${BASE_URL}/addBalance`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await res.json();
    // return result;
  };

  // useEffect(() => {
  //   const userId = Cookies.get("userId");
  //   console.log("id", userId);
  //   if (userId) {
  //     const fetCurrentUser = async () => {
  //       const res = await fetch(`${BASE_URL}/currentUser/${userId}`, {
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
  //   }
  // }, [token]);

  return (
    <AuthContext.Provider
      value={{
        SignUp,
        SignIn,
        token,
        setToken,
        UserId,
        setUserId,
        LogOut,
        currentState,
        setCurrentState,
        getUser,
        setGameState,
        getGameState,
        setWinState,
        getWinState,
        setCurrentGameAmount,
        currentGameAmount,
        addBalance,
      }}
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
