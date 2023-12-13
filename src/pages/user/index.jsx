import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Avatar, Box, colors } from "@mui/material";
import PostCard from "../../components/post";
import { AuthContext } from "../../context/AuthContext";
import { Add, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const UserProfile = ()=>{
    
    const param = useParams();
    const [posts,setPosts] = useState([])   
    const [user,setUser] = useState({})    
    const [following,setFollowing] = useState(false)
    const id = param.id
    const authCtx = useContext(AuthContext)
    const getUser = ()=>{  
        try{
            axios.get(`http://localhost:8080/api/v1/user/user/${id}`).then((response)=>{
            setUser(response.data);
        });
        }catch(e){}        
        
    }
    const getPosts = ()=>{
        try {
            axios.get(`http://localhost:8080/api/v1/publication/user/${id}`).then((response)=>{
                setPosts(response.data);
            })     
        } catch (error) {
            
        }
    }
    const getFollowing = async()=>{
        try {
            await axios.get(`http://localhost:8080/api/v1/user/isfollowing/${authCtx.id}/${id}`).then((response)=>{
                setFollowing(response.data);
            })
        } catch (error) {

        }
    }

    const unFollow = async()=>{
        try {
            // await axios.p
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getPosts()
        getUser()
        getFollowing()
    },[])

    useEffect(()=>{
        console.log(user);
    },[user])

    return(
        <Box className="container" sx={{
            width:'70%',
            marginX:'auto',
            marginTop:'20px'
        }}>
            <Avatar sx={{float:'left'}} src={user.imagePath} alt={user.firstName}/>
            <Box sx={{
                display:'inline-block',
                marginLeft:'10px'
            }}>
                name:{ user.firstName} { user.lastName}<br />
                email:{ user.email} <br />
                about me: {user.bio}
            </Box>
            {!following && 
                <AddCircleOutline sx={{
                    float:'right',
                    color:colors.blue[500],
                    onClick:{unFollow}
                }}
                />
            }
            {following && 
                <RemoveCircleOutline sx={{
                    float:'right',
                    color:colors.red[500]
                }}
                />
            }
            <Box sx={{
                marginTop:"20px"
            }}>
                {posts.map((post)=>(
                    <PostCard id={post.id} text={post.text} user={post.user} image={post.imagePath} flaggable={true}/>
                ))
                }
            </Box>
        </Box>
    );
}
export default UserProfile;