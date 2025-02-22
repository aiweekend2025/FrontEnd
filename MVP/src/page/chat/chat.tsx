const Chat = () => {
  return (
    <div className="w-100 vh-100 bg-dark d-flex justify-content-center align-items-center">
      <div className="bg-secondary text-white p-4 rounded position-relative" style={{ width: "90%", height: "80%" }}>
        <div className="h-100 d-flex flex-column justify-content-between">
          {/* Acalos mensajes */}
          <div className="flex-grow-1"></div>

          {/* Área de entrada de texto */}
          <div className="d-flex align-items-start position-absolute bottom-0 p-3" style={{ width: "96%" }}>
            <textarea 
              className="form-control" 
              style={{ height: "40px", maxHeight: "80px" }} 
              placeholder="Escribe aqui..." 
            />
            <button 
              className="ms-2 rounded border border-0 bg-dark text-white px-3" 
              style={{ height: "40px" }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
