import { useContext } from "react"
import { Link } from "react-router-dom"
import { userAuthContext } from "../App"
import { removeSession } from "../comman/Session";

export const UserNav = ({fullname, username, profile_img}) => {
    const {userDetails, setUserDetails} = useContext(userAuthContext);
    const handleSignout = () =>{
        setUserDetails({ });
        removeSession();
    }
    return (
    <div className="bg-white absolute right-0 top-[60px] border opacity-90 border-grey w-60 overflow-hidden duration-200">
         <div className="p-4">
            <div className="flex gap-3">
            <div className="bg-tertiary-light w-12 h-12 rounded-full">
            <img src={profile_img} className="w-10 ml-1 mt-1" alt="" />
            </div>
            <h2 className="capitalize text-2xl text-text font-head">{fullname} </h2>
            </div>
            <Link to={`/profile/${username}`}>
            <button  className="btn w-[180px] m-3">View Profile</button>
            </Link>
         </div>

         <hr className="text-grey" />
        <div className="p-3 hover:opacity-70">
            <Link to='/settings' className="flex gap-2">
            <i class="fi fi-rr-settings text-2xl pt-1 text-text"></i> <h2 className="text-2xl capitalize text-text">settings</h2>
            </Link>
        </div>

        <hr className="text-grey" />

        <div onClick={handleSignout} className="p-3 hover:opacity-70">
        <div className="flex gap-2">
        <i class="fi fi-rr-exit text-2xl pt-2 text-text"></i>
        <h2 className="text-[23px] text-text">Signout</h2>
        </div>
        <p className="text-text ml-3">@{username}</p>
        </div>

    </div>
    )
}