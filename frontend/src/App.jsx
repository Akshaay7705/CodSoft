import { Route, Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.component"
import Home from "./pages/Home"
import UserAuth from "./pages/UserAuth"
import { createContext, useEffect, useState } from "react"
import { getSession } from "./comman/Session"
import { Settings } from "./pages/Settings"
import ChangeSettings from "./pages/Changesettings"

export const userAuthContext = createContext({ });

const App = () => {
  const [userDetails, setUserDetails] = useState({ });
  useEffect(()=>{
    let currentSession = getSession();
    currentSession ? setUserDetails(JSON.parse(currentSession)) : setUserDetails({access_token : null});
  },[])
    return (
      <userAuthContext.Provider value={{userDetails, setUserDetails}}>
      <Routes>
        <Route path="/" element={<Navbar/>} >
            <Route index element={<Home />}></Route>
            <Route path="signin" element={<UserAuth type='signin' />}/>
            <Route path="signup" element={<UserAuth type='signup' />}/>
            <Route path="settings" element={<Settings />}/>
            <Route path="settings/:id" element={<ChangeSettings />} />
        </Route>
      </Routes>
      </userAuthContext.Provider>
    )
}

export default App