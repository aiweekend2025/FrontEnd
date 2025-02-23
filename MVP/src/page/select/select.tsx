
const Select = () => {
  return (
    <div className="bg-black w-100 vh-100">
      <div className="p-4 ">
        <a href="/" className="mt-2 ms-2 text-white" style={{textDecoration:"none"}}>LANDING</a>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center text-white mt-5" >
        <div className="p-2" style={{marginRight:"20%",  maxWidth:"300px"}}>
          <a href="../chat">
            <img src="https://raw.githubusercontent.com/aiweekend2025/FrontEnd/refs/heads/Ginella_chat/MVP/src/assets/WhatsApp%20Image%202025-02-23%20at%209.32.58%20AM.jpeg" alt="" className="" style={{height: "250px", width: "250px", borderRadius: "50%"}}/>
          </a>
          <h2 className="">Vilma y Jean</h2>
          <p className="">Vilma es una experta en Marketing y Jean es un experto en Creativo, este equipo encontraras lo que necesitas todo lo que necesitas para tu campaña de marketing. </p>
        </div>
        <div className="ms-5 p-2" style={{marginBottom:"91px"}}>
          <a href="">
            <img src="https://raw.githubusercontent.com/aiweekend2025/FrontEnd/refs/heads/Ginella_chat/MVP/src/assets/IMG-20250223-WA0053.jpg" alt="+" className="" style={{height: "250px", width: "250px", borderRadius: "50%"}}/>
          </a>
          <h2 className="">Otros</h2>
          <p className="">Equipos multidisiplinarios personalizados</p>
        </div>
      </div>
    </div>
  )
}

export default Select