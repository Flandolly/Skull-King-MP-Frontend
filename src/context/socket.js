import React from "react";
import socketio from "socket.io-client";

const ENDPOINT = process.env.NODE_ENV === "production" ? "https://sk-online-server.herokuapp.com" : "http://127.0.0.1:8080";

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();