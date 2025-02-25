import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// const socket = io("ws://localhost:9003"); // Asegúrate de que la URL sea correcta
const socket = new WebSocket("ws://localhost:9005");

const roleConfigs: Record<string, { img: string; color: string }> = {
  Vilma: {
    img: "https://raw.githubusercontent.com/aiweekend2025/FrontEnd/refs/heads/Ginella_chat/MVP/src/assets/WhatsApp%20Image%202025-02-23%20at%2009.32.58.jpeg",
    color: "#e100ff",
  },
  Jean: {
    img: "https://raw.githubusercontent.com/aiweekend2025/FrontEnd/refs/heads/Ginella_chat/MVP/src/assets/WhatsApp%20Image%202025-02-23%20at%2009.32.58%20(1).jpeg",
    color: "#2979ff",
  },
  Yo: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8GDrMMZ3vCvSZHCYRrj9AvIOIN5rZIXDyKA&s",
    color: "#8e24aa",
  },
  Alex: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnpvceZX_JeX0c3DOfa12Ui63AVZDuxkj9CQ&s",
    color: "#F94C10",
  },
};

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hover, setHover] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const currentUser = "Yo";

  useEffect(() => {
    socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
      console.log("Mensaje recibido:", event.data);
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    // return () => {
    //   socket.onclose = () => {
    //     console.log("Conexión cerrada");
    //   };
    // };
  }, []);

  // const sendMessage = () => {
  //   if (newMessage.trim() !== "") {
  //     const newMsg: Message = { sender: currentUser, text: newMessage };
  //     socket.emit("message", newMsg);
  //     setMessages((prevMessages) => [...prevMessages, newMsg]);
  //     setNewMessage("");
  //     if (textareaRef.current) textareaRef.current.style.height = "40px";
  //   }
  // };

  const sendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      const newMsg: Message = { sender: currentUser, text: newMessage };
      console.log("📤 Enviando mensaje:", newMsg);
      // socket.send(JSON.stringify(newMsg));
      socket.send(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "40px";
    }
  };

  return (
    <div
      className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center position-relative"
      style={{ background: "#0f0f0f" }}
    >
      <button
        className="mt-4 mb-4 ms-4 text-white px-3 border rounded position-absolute top-0 start-0"
        style={{
          background: hover ? "red" : "#4c4c4c",
          transition: "background 0.3s ease-in-out",
          border: "1px solid white",
          cursor: "pointer",
        }}
        onClick={() => navigate("/rubro")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Cerrar
      </button>
      <div
        className="text-white p-4 rounded position-relative d-flex flex-column"
        style={{ width: "90%", height: "80%", background: "#393939" }}
      >
        <div
          className="flex-grow-1 overflow-auto pb-3"
          style={{ maxHeight: "90%" }}
        >
          {messages.map((msg, index) => {
            const { img, color } = roleConfigs[msg.sender] || {
              img: "https://example.com/default.png",
              color: "gray",
            };
            return (
              <div
                key={index}
                className={`d-flex ${
                  msg.sender === "Yo"
                    ? "justify-content-end"
                    : "justify-content-start"
                } mb-2`}
              >
                {msg.sender !== "Yo" && (
                  <img
                    src={img}
                    alt={msg.sender}
                    className="me-3"
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <div
                  className="p-2 rounded text-white"
                  style={{
                    background: color,
                    maxWidth: "60%",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <p className="mb-1">{msg.text}</p>
                  <p className="text-muted small">{msg.sender}</p>
                </div>
                {msg.sender === "Yo" && (
                  <img
                    src={img}
                    alt={msg.sender}
                    className="ms-3"
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="d-flex align-items-center position-relative p-3 w-100">
          <textarea
            ref={textareaRef}
            className="form-control bg-secondary text-white w-100"
            style={{
              height: "40px",
              maxHeight: "120px",
              resize: "none",
              overflowY: "auto",
            }}
            placeholder="Escribe aquí..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            className="ms-2 rounded border-0 bg-dark text-white px-3"
            style={{ height: "40px", cursor: "pointer" }}
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
