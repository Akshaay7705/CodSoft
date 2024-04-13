import { useState, useRef, useEffect } from "react";
import { UserNav } from "./User.Navigation";

const Profile = ({ fullname, profile_img, username }) => {
    const [userPanel, setUserPanel] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setUserPanel(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    const handleProfileClick = () => {
        setUserPanel(val => !val);
    }

    return (
        <div ref={profileRef} onClick={handleProfileClick} className="w-8 relative left-6 bottom-2 bg-tertiary-light h-8 rounded-full cursor-pointer ease-in-out duration-700 ">
            <img src={profile_img} alt="" />
            <p className="flex gap-1">{username} <i className="fi fi-rr-angle-small-down pt-1"></i></p>
            {userPanel && <UserNav fullname={fullname} username={username} profile_img={profile_img} />}
        </div>
    )
}

export default Profile;