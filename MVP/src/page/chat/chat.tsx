const Chat = () => {
  return (
    <div className="w-100 vh-100 bg-dark d-flex justify-content-center align-items-center">
      <div className="bg-secondary text-white p-4 rounded" style={{width: "90%", height:"80%"}}>
        <div></div>
        <div className="d-flex">
          <textarea className="form-control mt-2 " style={{width:"90%", height:"35px", maxHeight:"80px"}} placeholder=""/> 
          <button className="mt-2 ms-2" style={{width:"5%", height:"30px"}}> D </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
