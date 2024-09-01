/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000/api/v1/user";
  const BASE_URL_DASHBOARD = "http://localhost:5000/api/v1/dashboard";

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [UserId, setUserId] = useState(Cookies.get("userId") || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentState, setCurrentState] = useState("START_GAME");
  const [slotGameState, setSlotGameState] = useState(null);
  // console.log("currentState", currentState);

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
    setCurrentState(data);

    Cookies.set("userState", data);
  };

  const getGameState = () => {
    const data = Cookies.get("userState");

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

  const gameData = async () => {
    const res = await fetch(`${BASE_URL_DASHBOARD}/gaming-data`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  };

  useEffect(() => {
    if (token) {
      const fetCurrentUser = async () => {
        const res = await fetch(`${BASE_URL}/me`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        console.log("result", result);
        if (result.success) {
          setCurrentUser(result.data);
        }
      };

      fetCurrentUser();
    }
  }, [token]);

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
        setCurrentUser,
        getUser,
        setGameState,
        getGameState,
        setWinState,
        getWinState,
        setCurrentGameAmount,
        currentGameAmount,
        addBalance,
        currentUser,
        gameData,
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
