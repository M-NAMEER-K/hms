import type { RootState } from "../../reducer/Store/store";
import { PiHeartbeatBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeJwt } from "../../reducer/Slices/jwtSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { removeUser } from "../../reducer/Slices/userSlice";


const Navbar=()=>{
      const [openSidebar, setOpenSidebar] = useState<boolean>(false);
      const token=useSelector((state:RootState)=>state.jwt);
      const dispatch=useDispatch();
      const navigate=useNavigate();


      const logoutHandler = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
    navigate("/login", { replace: true });
}




      return(
       <div className="sticky top-0 z-50 w-screen flex justify-between items-center p-2 border border-x-0 border-t-0 bg-white">
          
           <div className="flex items-center gap-x-1 text-pink-500 whitespace-nowrap">
                 <PiHeartbeatBold size={25}/>
                 <p className="font-medium underline text-2xl">Pulse</p>
            </div>
            <div className=" w-full flex  justify-end pr-5">
                   {   
                  
                 token?(<div className="flex items-center  justify-center">
                          <button onClick={logoutHandler} className="bg-pink-500 hover:bg-pink-400 text-white rounded-lg p-2">Logout</button>
                              <button><BsThreeDotsVertical onClick={()=>setOpenSidebar(true)} /></button>
                              <Sidebar open={openSidebar}  closeSidebar={()=>setOpenSidebar(false)} 
                                />
                             
                       </div>):(<div className=" flex items-center gap-x-2 ">
                          <Link to="/register" className="bg-pink-500 hover:bg-pink-400 text-white rounded-lg p-2">Register</Link>
                          <Link to="/login" className="bg-pink-500 hover:bg-pink-400 text-white rounded-lg p-2">Login</Link>
                       </div>)   
              }
            </div>
              
             

           
        </div>
      )
}

export default Navbar;