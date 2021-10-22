import React from "react";
import socketio from "socket.io-client";

const ENDPOINT = "https://sk-online-server.herokuapp.com";

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();