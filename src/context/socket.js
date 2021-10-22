import React from "react";
import socketio from "socket.io-client";
import {APIURL} from "../config/config";


export const socket = socketio.connect(APIURL);
export const SocketContext = React.createContext();