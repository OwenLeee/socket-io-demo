import React, { useState, useEffect } from "react";
import webSocket from "socket.io-client";

const SocketChatExample = () => {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");

  useEffect(() => {
    if (ws) {
      console.log("Connected to SocketIO Successfully!");
      initWebSocket();
    }
  }, [ws]);

  const connectWebSocket = () => {
    setWs(webSocket("localhost:8080"));
  };

  const initWebSocket = () => {
    ws.on("receiveMsg", (msg) => {
      setReceivedMsg(msg);
    });
  };

  const sendMsg = (event) => {
    ws.emit("receiveMsg", msg);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  return (
    <>
      <button onClick={connectWebSocket}> Connect To SocketIO </button>
      <form onSubmit={sendMsg}>
        <label>
          Msg to be sent:
          <input type="text" value={msg} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <p>Msg received from socket: {receivedMsg}</p>
    </>
  );
};

export default SocketChatExample;
