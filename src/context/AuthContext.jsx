import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext({
  accessToken:"",
  id : "",
  firstName : "",
  lastName : "",
  email : "",
  role:"",
  bio:"",
  profilePic:"",
  login :()=>{},
  logout: ()=>{}
});

const AuthProvider = ({children})=>{
  const [id,setId] = useState("");
  const [token,setToken] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [role,setRole] = useState("");
  const [bio,setBio] = useState("");
  const [profilePic,setProfilePic] = useState("");

    useEffect(()=>{
      const res = localStorage.getItem("user")
      if(res){
        let user = JSON.parse(res)
        console.log("from parse",user);
        setId(user.id);
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setRole(user.role)
        setToken(user.accessToken)
        setProfilePic(user.profilePic)
        setBio(user.bio)    
      }
    }
    ,[])

  const loginHandler = (data)=>{
    setId(data.id);
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setEmail(data.email)
    setRole(data.role)
    setToken(data.accessToken)
    setProfilePic(data.profilePic)
    setBio(data.bio)    
    console.log("access",data.accessToken);
    localStorage.setItem("user",JSON.stringify(data))
  } 

  const logoutHandler = ()=>{
    setId("");
    setFirstName("")
    setLastName("")
    setEmail("")
    setRole("")
    setToken("")
    setBio("")
    setProfilePic("")
    localStorage.removeItem("user")
  } 

  return (
    <AuthContext.Provider value={{id:id,token:token,email:email,firstName:firstName,lastName:lastName,role:role,login:loginHandler,logout:logoutHandler,profilePic:profilePic,bio:bio}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider