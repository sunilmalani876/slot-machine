/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./useAuthContext";
import { io } from "socket.io-client";
import { useAuthContext } from "./authContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { UserId, token, getUser } = useAuthContext();
  const [CurrentState, setCurrentState] = useState({
    pre: "",
    curr: "START",
  });

  const userId = getUser();

  useEffect(() => {
    if (token) {
      const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
        query: {
          id: userId ? userId.id : "",
        },

        extraHeaders: {
          token: token,
        },
      });

      setSocket(socket);

      socket?.on("START", (mess) => {
        console.log(mess);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token, UserId]);

  return (
    <SocketContext.Provider value={{ socket, CurrentState, setCurrentState }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (context === undefined)
    throw new Error("useSocketContext must be used within a SocketContext");

  return context;
};
