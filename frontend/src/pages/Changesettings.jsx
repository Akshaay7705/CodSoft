import { useParams } from "react-router-dom"
import ShowData from "../components/change.components"

const ChangeSettings = () => {
    const {id} = useParams()
    
    return (
        <div className="w-[40%] h-[80vh]  absolute left-[30%] top-[15%]">
            {
               <ShowData name={id} />
            }
       
        </div>
    )
}

export default ChangeSettings