import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { userAuthContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Input from "./Input.component";

const ShowData = ({ name }) => {
    const userState = {
        profile_details: {
            fullname: "",
            email: "",
            username: "",
            phone: "",
            country: "",
            city: '',
        },
        IsEmployer: false
    };
    const AuthForm = useRef();
    const PasswordForm = useRef();
    const NumberForm = useRef();
    const EmailForm = useRef();
    const handleServerReq = (data) =>{
        
        axios.post(import.meta.env.VITE_SERVER_ROUTE + "/update-user", {username: username, type: name, data:data})
        .then((response) => {
            toast.success(response.data.msg);
        })
        .catch(({response}) => {
            toast.error(response.data.error);
    })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data;
        if (name == 'employer-details') {
            setUserData(prevUserData => ({
                ...prevUserData,
                IsEmployer: !prevUserData.IsEmployer
            }));
            data = null
        }
        if (name == 'name-locations') {
        let form = new FormData(AuthForm.current);
    
        // Log form data to check if it's captured properly
        let formData = {};
        for (let [key,value] of form.entries()) {
            formData[key] = value
         }
         const { fullname, country, city } = formData
         setUserData(prevUserData => ({
            ...prevUserData,
            'userData.profile_details.fullname': fullname
        }));
        setUserData(prevUserData => ({
            ...prevUserData,
            'userData.profile_details.country': country
        }));setUserData(prevUserData => ({
            ...prevUserData,
            'userData.profile_details.city': city
        }));

        
        data = formData
        }

        if (name == 'change-password') {
            let form = new FormData(PasswordForm.current);
        
            // Log form data to check if it's captured properly
            let formData = {};
            for (let [key,value] of form.entries()) {
                formData[key] = value
             }
             const { newPassword, confirmNewPassword } = formData

             if (newPassword != confirmNewPassword) {
                return toast.error("New password and confirm password should be the same")
             }
             else if(newPassword.length < 6){
                return toast.error("Passwords should be atleat six letters long")
             }
             

            data = newPassword;
        }    

        if (name == 'phone-number') {
            let form = new FormData(NumberForm.current);
        
            // Log form data to check if it's captured properly
            let formData = {};
            for (let [key,value] of form.entries()) {
                formData[key] = value
             }
             const { phone } = formData
            if (phone.length != 10 || phone.length == 0) {
                toast.error("Please enter a valid phone number")
            }
            data = formData;
        }    
        
        if (name == 'email-address') {
            let form = new FormData(EmailForm.current);
        
            // Log form data to check if it's captured properly
            let formData = {};
            for (let [key,value] of form.entries()) {
                formData[key] = value
             }
             const { email } = formData
            if (!email.length) {
                toast.error("Please enter a valid email")
            }
            data = formData;
        }   
        handleServerReq(data);
    };
    const { userDetails: { username } } = useContext(userAuthContext);
    const [userData, setUserData] = useState(userState);

    const getData = async () => {
        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/get-user-data', { username })
            .then((response) => {
                setUserData(response.data.msg);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    useEffect(() => {
        getData();
    }, [username]);

    useEffect(() => {
        console.log(userData.profile_details.fullname);
    }, [userData]);

    return (
        <>
        <Link className="pt-6" to="/settings"><i class="fi text-2xl fi-rr-arrow-left"></i></Link>
        <div className="pl-10 pt-4">
            <Toaster />
            {name === 'employer-details' ?
                <>
                    <h1 className="capitalize text-4xl font-light text-dark-grey">{name.replace(/[-]/g, ' ')}</h1>
                    <h1 className="pt-4 text-head text-2xl text-dark-grey">{userData.IsEmployer ? "You are currently hiring" : "You are not hiring currently"}</h1>
                    {
                        userData.IsEmployer ? 
                        <div className="pt-4">
                            <h1 className="pt-4 text-head text-2xl text-dark-grey">Don't want to hire?</h1>
                            <button onClick={handleSubmit} className="bg-tertiary border border-tertiary text-white capitalize mt-4 hover:opacity-50 p-3 text-p_text w-[195px]">unhire now</button>
                        </div>: 
                        <div className="pt-4">
                            <h1 className="pt-4 text-head text-2xl text-dark-grey">Become a recruiter now?</h1>
                            <button onClick={handleSubmit} className="bg-tertiary border border-tertiary text-white capitalize mt-4 hover:opacity-50 p-3 text-p_text w-[195px]">hire now</button>
                        </div>
                    }
                </> : name == 'name-locations' ? 
                <>
                <form ref={AuthForm}>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Fullname"
                        value={userData.profile_details.fullname} 
                        icon="fi fi-sr-user"
                        page="items"
                    />
                    <Input
                        name="country"
                        type="text"
                        placeholder="Country"
                        value={userData.profile_details.country} 
                        icon="fi fi-rr-flag"
                        page="items"
                    />
                    <Input
                        name="city"
                        type="text"
                        placeholder="City"
                        value={userData.profile_details.city}
                        icon="fi fi-rr-flag"
                        page="items"
                    />

                   <button onClick={handleSubmit} className="bg-tertiary border border-tertiary text-white capitalize mt-4 hover:opacity-50 p-3 ml-10 text-p_text w-[195px]">update data</button>
                   </form>
                </> : name == 'change-password' ? 
                <>
                  <form ref={PasswordForm}>
                  <Input name="newPassword" type="password" placeholder="New Password" icon="fi fi-rr-key" page="password"/>
                  <Input name="confirmNewPassword" type="password" placeholder="Confirm New Password" icon="fi fi-rr-key" page="npassword"/>
                  <button onClick={handleSubmit} className="bg-tertiary border border-tertiary text-white capitalize mt-4 hover:opacity-50 p-3 ml-10 text-p_text w-[195px]">change password</button>
                  </form>
                </> : name == 'phone-number' ? 
                <> 
                   <form ref={NumberForm}>
                   <Input
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        value={userData.profile_details.phone} 
                        icon="fi fi-rr-phone-call"
                    />

                  <button onClick={handleSubmit} className="bg-tertiary border border-tertiary text-white capitalize mt-4 hover:opacity-50 p-3 ml-10 text-p_text w-[195px]">update</button>
                  </form>
                </> : <form ref={EmailForm}>
                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={userData.profile_details.email} 
                    icon="fi fi-rr-envelope"
                />
                  <button onClick={handleSubmit} className="bg-tertiary border border-tertiary text-white capitalize mt-4 hover:opacity-50 p-3 ml-10 text-p_text w-[195px]">update</button>
                  </form>
            }
        </div>
        </>
    );
};

export default ShowData;
