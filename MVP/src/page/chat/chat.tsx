import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hover, setHover] = useState(false);

  // Mapeo de imágenes de los roles
  const roleImages: Record<string, string> = {
    "Experta Marketing": "https://raw.githubusercontent.com/aiweekend2025/FrontEnd/refs/heads/Ginella_chat/MVP/src/assets/WhatsApp%20Image%202025-02-23%20at%2009.32.58.jpeg",
    "Experto en diseño": "https://raw.githubusercontent.com/aiweekend2025/FrontEnd/refs/heads/Ginella_chat/MVP/src/assets/WhatsApp%20Image%202025-02-23%20at%2009.32.58%20(1).jpeg",
    "Yo": "https://example.com/yo.png",
  };

  // Mensajes iniciales con imágenes incluidas
  const [messages, setMessages] = useState([
    { text: "Me estas pidiendo un montón pepeee", sender: "Vilma. Experta Marketing", color: "#e100ff", img: roleImages["Experta Marketing"] },
    { text: "Que te conteste el otro", sender: "Jean. Experto en diseño", color: "#2979ff", img: roleImages["Experto en diseño"] },
    { text: "Pe Pe... Pero...", sender: "Yo", color: "#8e24aa", img: roleImages["Yo"] },
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleCloseChat = () => navigate("/rubro"); // Redirige a la página anterior

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: "Yo", color: "#8e24aa", img: roleImages["Yo"] },
      ]);
      setNewMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "40px"; // Reset altura
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"; // Reiniciar altura
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center position-relative" style={{ background: "#0f0f0f" }}>
      
      {/* Botón de cerrar */}
      <button
        className="mt-4 mb-4 ms-4 text-white px-3 border rounded position-absolute top-0 start-0"
        style={{
          background: hover ? "red" : "#4c4c4c",
          transition: "background 0.3s ease-in-out",
          border: "1px solid white",
          cursor: "pointer"
        }}
        onClick={handleCloseChat}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="Cerrar chat"
      >
        Cerrar
      </button>

      {/* Contenedor del chat */}
      <div className="text-white p-4 rounded position-relative d-flex flex-column" style={{ width: "90%", height: "80%", background: "#393939" }}>
        
        {/* Área de mensajes */}
        <div className="flex-grow-1 overflow-auto pb-3" style={{ maxHeight: "90%" }}>
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender === "Yo" ? "justify-content-end" : "justify-content-start"} mb-2`}>
              
              {msg.sender !== "Yo" && (
                <img src={msg.img} alt={msg.sender} className="me-3" style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
              )}

              <div className="p-2 rounded text-white" style={{ background: msg.color, maxWidth: "60%", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                <p className="mb-1">{msg.text}</p>
                <p className="text-muted small">{msg.sender}</p>
              </div>

              {msg.sender === "Yo" && (
                <img src={msg.img} alt={msg.sender} className="ms-3" style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
              )}
            </div>
          ))}
        </div>

        {/* Área de entrada de texto */}
        <div className="d-flex align-items-center position-relative p-3 w-100">
          <textarea
            ref={textareaRef}
            className="form-control bg-secondary text-white w-100"
            style={{ height: "40px", maxHeight: "120px", resize: "none", overflowY: "auto" }}
            placeholder="Escribe aquí..."
            value={newMessage}
            onChange={handleTextareaChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            aria-label="Escribe tu mensaje"
          />
          <button
            className="ms-2 rounded border-0 bg-dark text-white px-3"
            style={{ height: "40px", cursor: "pointer" }}
            onClick={sendMessage}
            aria-label="Enviar mensaje"
          >
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;
