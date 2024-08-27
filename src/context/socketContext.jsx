/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./useAuthContext";
import { io } from "socket.io-client";
import { useAuthContext } from "./authContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { UserId, token } = useAuthContext();
  const [CurrentState, setCurrentState] = useState({
    pre: "",
    curr: "START",
  });

  //   const { token, user } = useAuthContext();

  // id: "66ca0bdd2383a811ff930603"   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2EwYmRkMjM4M2E4MTFmZjkzMDYwMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI0NjcxOTI0LCJleHAiOjE3MjQ3NTgzMjR9.kzprvwwQJywf1qC9iLnuZyKV_MtTqQ9QA03dboNqPCg

  useEffect(() => {
    if (token) {
      const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
        query: {
          id: UserId ? UserId : "",
        },

        extraHeaders: {
          token: token,
        },
      });

      console.log("socket", socket);
      setSocket(socket);

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
