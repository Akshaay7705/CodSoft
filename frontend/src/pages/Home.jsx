import { useContext, useState, useEffect } from 'react'
import { Tags } from '../components/Tags.component'
import backdrop from '../img/home-backdrop.jpeg'
import { userAuthContext } from '../App'
import { Navigate, useNavigate } from 'react-router-dom'
import HomeComponent from '../components/home.component'
import axios from "axios";

const Home = () => {
    const {userDetails:{ access_token}} = useContext(userAuthContext);
    const [jobs, setJobs] = useState(null)
    let navigate = useNavigate();
    const getHomePageData = () => {
        
        axios.get(import.meta.env.VITE_SERVER_ROUTE + '/get-jobs')
        .then(({data : {msg}}) => {
            setJobs(msg)
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getHomePageData()
        console.log(jobs);
    }, []);

    useEffect(() => {
        console.log(jobs);
    }, [jobs]);
    const handleNavigateSignup = () => {
        navigate("/signup")
        
    }
    return (
         
        access_token ? 
        <div className="absolute top-[15%] left-[20%] w-[60%] h-[80%] shadow-lg overflow-scroll overscroll-contain scroll-smooth flex flex-wrap gap-12 pl-6 pt-6">
            
            {jobs && jobs.length ? (
                jobs.map((job, i) => (
                    <>
                    <HomeComponent content={job} key={i}/>
                    </>
                ))
            ) : (
                <p>There is no data</p>
            )}
        </div> : <div className="absolute top-[20%] w-[60%] m-6 ">
        
        <p className="font-thin text-text w-[80%]  text-4xl ml-[120px] mt-[20px] tracking-wide opacity-45 ">Find the right job or <br /> internship for you</p>
        <img src={backdrop} className='relative left-[80%] bottom-[110px]' alt="" />

        <button onClick={handleNavigateSignup} className='m-4 relative bottom-[420px] left-[110px] ml-[24px] text-xl bg-tertiary text-white p-2 mt-10 w-[25%] border border-tertiary rounded-xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 delay-300'>Sign up</button>
        
        </div> 
        
        
    )
}
export default Home