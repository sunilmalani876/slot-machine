/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./useAuthContext";
import { io } from "socket.io-client";
import { useAuthContext } from "./authContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { UserId, token, getUser, setCurrentGameAmount } = useAuthContext();
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

      // socket?.emit("GET_CURRENT_STATE", (msg) => {
      //   console.log("emit get CURRENT_STATE", msg);
      // });

      // socket?.on("CURRENT_STATE", (msg) => {
      //   setCurrentGameAmount(msg);
      //   console.log("emit CURRENT_STATE", msg);
      // });

      return () => {
        socket.close();
        // socket?.off("CURRENT_STATE");
      };
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
