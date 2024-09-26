import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // This should remain as http

const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"], // Specify transports to use
});

socket.connect();

socket.on("connect", () => {
  console.log(`Connected to websocket server: ${SOCKET_URL}`);
});

export default socket;
