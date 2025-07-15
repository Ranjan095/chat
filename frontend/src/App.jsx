import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4002"); // Updated backend port

function App() {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (msg.trim() && username.trim()) {
      socket.emit("send_message", {
        username,
        text: msg,
      });
      setMsg("");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">💬 Real-Time Chat</h1>

      <div className="mb-4 space-y-2">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>

      <div className="space-y-1 max-h-80 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className="p-2 bg-gray-100 rounded">
            <span className="font-semibold">{m.username}</span>{" "}
            <span className="text-sm text-gray-500">({m.time})</span>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
