import { Avatar, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FollowingsList = ({id})=>{
    const [followings,setFollowings]=useState([]);

    const getFollowings = async()=>{
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/following/${id}`);
        setFollowings(response.data);        
      } catch (error) {
        
      }

    }

    useEffect(()=>{
        getFollowings();
    },[])
    return(
        <>
            {followings.length == 0 && <>you aren't following anyone as of now</>}
            {followings.map((follower)=>(
                 <Card sx={{
                    mx:'auto', 
                    width: '50%',
                    marginBottom: '4px',
                  }}>
                    <CardContent>
                    <Link to={`/profile/${follower.id}`}>
                        <Avatar src ={`${follower.profilePic}`} alt={follower.firstName}/>
                        <Typography sx={{
                          fontWeight: 'bold',
                          marginBottom: '2px'
                        }} variant="subtitle1">
                          {follower.firstName} {follower.lastName}
                        </Typography>  
                    </Link>
                    </CardContent>       
                  </Card>
            ))}
        </>
    );
}
export default FollowingsList;