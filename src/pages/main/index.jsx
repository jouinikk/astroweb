import { Routes, Route } from "react-router-dom";
import Profile from "../profile";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Home from "../home";
import TopBar from "../../components/topBar";
import UserProfile from "../user";
import AdminTopBar from "../../components/adminTopBar";
import Users from "../users";
import Flags from "../flags";
import ExplorePage from "../explore";
const MainPage =()=>{    
    const authCtx = useContext(AuthContext)
    switch (authCtx.role) {
      case "USER":
      return( <>
          <TopBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/explore" element={<ExplorePage />}/>
          </Routes>
          </>           
        )
      break;
      case "ADMIN":
        return(
          <>
            <AdminTopBar />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/flags" element={<Flags/> } />
            </Routes>
          </>
        )
      default:
        break;
    }    
}
export default MainPage;
