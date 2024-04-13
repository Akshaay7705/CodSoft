import { useState } from "react"

const Input = ({name, type, id, value, placeholder, icon, page}) =>{
    const [ ispassword, setisPassword] = useState(false)
    return (
        <>
        <div className="relative w-100% mb-4">
         <input 
         name={name} 
         type={type == "password" ? ispassword ? "text" : "password" : type}
         id={id}
         placeholder={placeholder}
         defaultValue={value}
         className={`input-box ml-[40px] ` + (page=='items' ? "capitalize" : "") + (page == 'npassword' ? "w-[280px]" : "")}
         />

         <i className={"fi "+ icon  +" input-icon"}></i>

         {
             type == "password" ? <i className={"fi fi-rr-eye" + (!ispassword ? "-crossed" : "") + (page == 'password' ? " ml-[32%]" : page == 'npassword' ? " ml-[40%]":" ml-[23%]") + " input-icon  mt-1 cursor-pointer "}
             onClick={() => { setisPassword(currentVal => !currentVal)}}
             ></i> : ""
         }
        </div>

     </>
    )
}
export default Input