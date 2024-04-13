


const HomeComponent = ({content}) => {
    const {title, description, job_id, job_time, place, qualification, responsibility, skills, company_id:{profile_details : {email, fullname, username}}} = content
    return (
        <div className="w-[45%] h-[45%] border border-grey ">
            <h1 className="text-xl p-6">{title}</h1>
            <p className="pl-6 text-sm"><i className="pr-3 fi fi-rs-marker"></i>{place}</p>
            <p className="pl-6 pt-4 line-clamp-2">{description}</p>
            <p className="pl-6 pt-4 lineclamp-2">{qualification[0]}</p>
            <button className="bg-tertiary border border-tertiary p-2 w-[180px] rounded-full text-white mb-4 m-4 ml-[25%]">Apply now</button>
        </div>
    );
};

export default HomeComponent