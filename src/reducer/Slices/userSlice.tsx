import { createSlice } from "@reduxjs/toolkit";



const userSlice=createSlice({
      name:"user",
      initialState:localStorage.getItem("user")?(JSON.parse(localStorage.getItem("user")!)||""):{},
      reducers:{
          setUser:(state , action)=>{
            localStorage.setItem("user",JSON.stringify(action.payload));
            
              return action.payload;
          },
          removeUser:()=>{
            localStorage.removeItem("user");
            
              return {};
          }
      }
});

export const { setUser,removeUser}=userSlice.actions;
export default userSlice.reducer;