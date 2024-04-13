import { createContext, useContext, useState } from "react"
import { userAuthContext } from "../App";
import { Link, Navigate } from "react-router-dom";
import { Items } from "../components/Items.component";

export const editorStateContext = createContext() 
export const Settings = () => {
    const [edit, setEdit] = useState(false)
    const { userDetails : {access_token} , setUserDetails } = useContext(userAuthContext);
     return (
        access_token ? 

        edit ? "" : 
        <editorStateContext.Provider value={{edit, setEdit}}>
        <div className="absolute w-[45%] h-[82%]  shadow-lg top-[14%] left-[28%]">
           <h1 className="head text-[20px] p-10  w-[20px] cursor-default font-regular">Settings</h1>
           <i className="fi fi-rr-settings relative bottom-[67px] left-3 text-2xl left-3"></i>
           <hr className="text-grey"/>
           <div className="">
            <h1 className="head text-[18px] p-6 m-4"><i className="fi fi-rr-user"></i> Profile info</h1>
            <hr className="text-grey"/>
            <Items name="name, locations" /> 
            <Items name="employer details" />
           </div>

           <div className="">
           <h1 className="head text-[18px] p-6 m-4"><i class="fi fi-rr-portrait"></i> Account access</h1>
           <hr className="text-grey"/>
           <Items name="email address" /> 
            <Items name="phone number" /> 
            <Items name="change password" /> 
           </div>
        </div>
        </editorStateContext.Provider>
        :
        <Navigate to="/"/>
     )
}