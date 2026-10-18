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
      const [showLogoutPopup, setShowLogoutPopup] = useState(false);
      const [logoutLoading, setLogoutLoading] = useState(false);
      const token=useSelector((state:RootState)=>state.jwt);
      const dispatch=useDispatch();
      const navigate=useNavigate();


 const logoutHandler = () => {
    setLogoutLoading(true);

    setTimeout(() => {
        dispatch(removeJwt());
        dispatch(removeUser());
        setShowLogoutPopup(false);
        setLogoutLoading(false);
        navigate("/login", { replace: true });
    }, 800);
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
                          <button   onClick={()=>setShowLogoutPopup(true)} className="bg-pink-500 hover:bg-pink-400 text-white rounded-lg p-2">Logout</button>
                              <button><BsThreeDotsVertical onClick={()=>setOpenSidebar(true)} /></button>
                              <Sidebar open={openSidebar}  closeSidebar={()=>setOpenSidebar(false)} 
                                />
                             
                       </div>):(<div className=" flex items-center gap-x-2 ">
                          <Link to="/register" className="bg-pink-500 hover:bg-pink-400 text-white rounded-lg p-2">Register</Link>
                          <Link to="/login" className="bg-pink-500 hover:bg-pink-400 text-white rounded-lg p-2">Login</Link>
                       </div>)   
              }
            </div>
              
              {showLogoutPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">
             Confirm Logout
          </h2>

          <p className="text-gray-600 mt-2">
             Are you sure you want to logout?
          </p>

          <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={()=>setShowLogoutPopup(false)}
                className="px-4 py-2 border rounded-lg">
                Cancel
              </button>

            <button
  onClick={logoutHandler}
  disabled={logoutLoading}
  className={`px-4 py-2 rounded-lg text-white ${
      logoutLoading 
      ? "bg-pink-300 cursor-not-allowed" 
      : "bg-pink-500 hover:bg-pink-600"
  }`}
>
  {logoutLoading ? "Logging out..." : "Logout"}
</button>
          </div>
      </div>
  </div>
)}

           
        </div>
      )
}

export default Navbar;