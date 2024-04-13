import { Link, Navigate } from "react-router-dom"
import {toast, Toaster} from "react-hot-toast"
import axios from 'axios';
import { useContext, useRef } from "react";
import { userAuthContext } from "../App";
import { createSession } from "../comman/Session";
import Input from "../components/Input.component";

const UserAuth = ({type}) => {
    const AuthForm = useRef();
    const {userDetails : {access_token}, setUserDetails } = useContext(userAuthContext);
    const userAuthentication = (server, data) =>{
        console.log(import.meta.env.VITE_SERVER_ROUTE + server);
        axios.post(import.meta.env.VITE_SERVER_ROUTE + server, data)
        .then(( {data} ) =>{
            // console.log(data);
            createSession(JSON.stringify(data));
            setUserDetails(data);
            console.log(data)
        })
        .catch(( {response} ) =>{
            // console.log(response);
            toast.error(response.data.error)
        })
    }
    const handleSubmitBtn = (e) =>{
        e.preventDefault();
        let Route = type == "signin" ? "/signin" : "/signup"
         
        let form = new FormData(AuthForm.current);
    
        // Log form data to check if it's captured properly
        let formData = {};
        for (let [key,value] of form.entries()) {
            formData[key] = value
         }
         const { firstname, lastname, email, password } = formData
         let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
         let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
         if (firstname) {
            let fullname = `${firstname} ${lastname}`;
            if (fullname.length < 3) {
                return toast.error( "Fullname must be atleast 3 letters long");
            }
            if(!lastname.length){
                return toast.error( "Please enter lastname");
            }
         }
         if (!email.length) {
             return toast.error("Enter the email");
         }
         if (!emailRegex.test(email)) {
             return toast.error( "Invalid email");
         }
         if (!passwordRegex.test(password)) {
             return toast.error( "Password should atleast be 6-12 characters long and should contain atleast 1 capital letter");
         }

         userAuthentication(Route, formData);
    }

    
    return ( 
                    
                access_token ? <Navigate to="/" /> :
                <div   className="absolute top-[20%] left-[10%] w-[55%] h-[60%]  ">
                    <form ref={AuthForm}>
                    <Toaster />
                    <h1 className="heading pl-6">{type == "signup" ? "Create  An Account" : "Welcome Back" }</h1>

                    <div className="flex flex-col">
                    {
                        type == "signup" ?  <div className="flex pt-8">
                            <Input name="firstname" type="text" id="firstname" placeholder="First Name" icon="fi fi-rs-user " />
                            <Input name="lastname" type="text" id="lastname" placeholder="Last Name" icon="fi fi-rs-user " />
                        </div> : ""
                    }
                    <div className="flex flex-col ">
                    <Input name="email" type="text" id="email" placeholder="Email" icon="fi fi-rr-envelope " />
                    <Input name="password" type="password" id="password" placeholder="Password" icon="fi fi-rr-key " />
                    </div>

                    {
                        type == "signup" ? 
                        <>
                        <button onClick={handleSubmitBtn} type="submit" className="btn ml-8  w-[40%]">Sign up</button>
                        <p className="p-5 pl-9 text-dark-grey text-xl">Already a member? <Link to="/signin" className="underline text-black">Sign in</Link></p>
                        </> : 
                        <>
                        <button onClick={handleSubmitBtn} type="submit" className="btn ml-8 w-[40%]" >Sign in</button>
                    <p className="p-5 pl-9 text-dark-grey text-xl ">Don't have an account? <Link to="/signup" className="underline text-black">Sign up</Link></p>
                        </>
                    }
                    
                    </div>
                    </form>
                </div>
            
    )
}

export default UserAuth