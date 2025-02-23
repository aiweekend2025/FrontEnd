import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Me estas pidiendo un montón pepeee", sender: "Experto Marketing", color: "#e100ff" },
    { text: "Que te conteste el otro", sender: "Experto en diseño", color: "#2979ff" },
    { text: "Pe Pe... Pero...", sender: "Yo", color: "#8e24aa" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleCloseChat = () => {
    navigate("/rubro"); // Redirige a la página de inicio
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "Yo", color: "#8e24aa" }]);
      setNewMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px"; // Resetea la altura al enviar
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"; // Reiniciar altura
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"; // Ajusta hasta 120px
    }
  };
  const [hover, setHover] = useState(false);

  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center position-relative" style={{ background: "#0f0f0f" }}>
      <button
        className="mt-4 mb-4 ms-4 text-white px-3 border rounded position-absolute top-0 start-0"
        style={{ 
          background: hover ? "red" : "#4c4c4c", 
          transition: "background 0.3s ease-in-out",
          border: "1px solid white"
        }}
        onClick={handleCloseChat}
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
      >
        Cerrar
      </button>
      
      <div className="text-white p-4 rounded position-relative" style={{ width: "90%", height: "80%", background: "#393939" }}>
        <div className="h-100 d-flex flex-column justify-content-between">
          
          {/* Área de mensajes */}
          <div className="d-flex flex-column overflow-auto" style={{ maxHeight: "90%", paddingBottom: "60px" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`d-flex ${msg.sender === "Yo" ? "justify-content-end" : "justify-content-start"} mb-2`}>
                {msg.sender !== "Yo" && (
                  <img src="https://github.com/aiweekend2025/FrontEnd/blob/a38cea74066c13e4363168f6ec5493ca6f1101a7/MVP/src/assets/react.svg" 
                    alt="" className="me-3" style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
                )}
                <div className="p-2 rounded" style={{ background: msg.color, maxWidth: "60%", wordBreak:"break-word", whiteSpace:"pre-wrap" }}>
                  <p className="mb-1">{msg.text}</p>
                  <p className="text-muted small">{msg.sender}</p>
                </div>
                {msg.sender === "Yo" && (
                  <img src="https://github.com/aiweekend2025/FrontEnd/blob/a38cea74066c13e4363168f6ec5493ca6f1101a7/MVP/src/assets/react.svg" 
                    alt="" className="ms-3" style={{ height: "40px", width: "40px", borderRadius: "50%"}} />
                )}
              </div>
            ))}
          </div>

          {/* Área de entrada de texto */}
          <div className="d-flex align-items-start position-absolute bottom-0 p-3" style={{ width: "96%" }}>
            <textarea
              ref={textareaRef}
              className="form-control bg-secondary text-white"
              style={{ height: "40px", maxHeight: "120px", resize: "none", overflowY: "auto" }}
              placeholder="Escribe aquí..."
              value={newMessage}
              onChange={handleTextareaChange}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())} // Enviar con Enter, Shift+Enter para nueva línea
            />
            <button className="ms-2 rounded border border-0 bg-dark text-white px-3" style={{ height: "40px" }} onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
