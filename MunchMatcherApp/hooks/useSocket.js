import io from "socket.io-client";
import React from "react";

export const useSocket = (props) => {
  return (socket = io("http://192.168.1.139:3000"));
};
