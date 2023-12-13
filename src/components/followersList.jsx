import { Face2 } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FollowersList = ({id})=>{
    const [followers,setFollowers]=useState([]);

    const getFollowers = async()=>{
        const response = await axios.get(`http://localhost:8080/api/v1/user/followers/${id}`);
        setFollowers(response.data);
    }

    useEffect(()=>{
        getFollowers();
    },[])
    return(
        <>  
            {followers.length == 0 && <>you have no followers yet</>}
            {followers.map((follower)=>(
                 <Card sx={{
                    mx:'auto', 
                    width: '50%',
                    marginBottom: '4px',
                  }}>
                    <CardContent>
                    <Link to={`/profile/${follower.id}`}>
                        <Box sx={{
                          
                        }}>
                          <Avatar src ={`${follower.profilePic}`} alt={follower.firstName}/>
                          <Typography sx={{
                            fontWeight: 'bold',
                            marginBottom: '2px'
                          }} variant="subtitle1">
                            {follower.firstName} {follower.lastName}
                          </Typography>
                        </Box>  
                    </Link>
                    </CardContent>       
                  </Card>
            ))}
        </>
    );
}
export default FollowersList;