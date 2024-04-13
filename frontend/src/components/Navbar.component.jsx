import { Link, Outlet } from 'react-router-dom';
import logo from '../img/job_logo.png';
import { useContext } from 'react';
import { userAuthContext } from '../App';
import Profile from './Profile.component';
const Navbar = () => {
    const { userDetails:{ access_token, fullname, profile_img, username}} = useContext(userAuthContext);
    return (
        <>
        <div className="navbar">

            <Link to="/"><img className='min-w-[160px] max-w-[170px]' src={logo} alt="" /></Link>
            <div className="pl-[200px]">
            <ul className='flex flex-row gap-[60px]'>
                <input type="text" className='p-3 w-[260px] relative rounded-full placeholder:text-text font-thin text-[14px] pl-4 outline-none duration-800 ease-in-out focus:border focus:border-primary' placeholder='Search'/>
                <button className='relative right-[110px] top-[1px]'><i className="fi fi-rr-search"></i></button>
                <div className="flex flex-row gap-[45px] relative  top-1 ">
                    <li className=""><Link to="/" className='text-black text-[14px] hover:opacity-70 duration-700 hover:transition-all '>Home</Link></li>
                    <li className=""><Link to="/blogs" className='text-black text-[14px] hover:opacity-70 duration-700 hover:transition-all'>Alerts</Link></li>
                    <li className=""><Link to="/contact" className='text-black text-[14px] hover:opacity-70 duration-700 hover:transition-all'>Contact us</Link></li>
                    </div>
                </ul>
            </div>


            {
                access_token ? <Profile fullname={fullname} profile_img={profile_img} username={username} ></Profile>  : <>
                     <div className="flex relative bottom-1 gap-[10px] ">
            <Link className='btn-dark py-2 ' to="/signin">
            Sign in
         </Link>


         <Link className='btn-light py-2 hidden md:block' to="/signup">
            Sign up
         </Link>
            </div>

                </>
            }
            
        </div>
        
        
        <Outlet />
        </>
    )
}

export default Navbar