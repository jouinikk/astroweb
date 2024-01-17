import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Avatar, Box, Card, CardContent, CardHeader, Typography, colors} from "@mui/material";
import {Add, AddCircleRounded} from "@mui/icons-material";
import {Link} from "react-router-dom";

const ExplorePage = () => {
    const [users, setUsers] = useState([])
    const authCtx = useContext(AuthContext)
    const getUsers = async () => {
        try {
            await axios.get(`http://localhost:8080/api/v1/user/explore/${authCtx.id}`).then((response) => {
                setUsers(response.data);
            });
        } catch (error) {
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleFollow = async (id) => {
        await axios.post('http://localhost:8080/api/v1/user/follow', {
            follower: authCtx.id,
            following: id
        }).then((response) => {
            if (response.status === 200) {
                getUsers();
            } else {
                alert("there was a problem ! please try again.");
            }
        })
    }

    return (
        <Box container sx={{
            width: "60%",
            marginX: "auto",
            marginTop: "20px"
        }}>
            {users.map((user) => (
                <>
                    <CardContent>
                        <Box sx={{display: 'inline-flex', marginY: 2}}>
                            <Link to={`/profile/${user.id}`}>
                                <Avatar src={user.profilePic} alt={user.firstName}/>
                                <Typography sx={{
                                    marginLeft: "10px"
                                }} variant="h5">{user.firstName} {user.lastName}</Typography>
                            </Link>
                            <AddCircleRounded
                                sx={{
                                    float: "right",
                                    color: colors.blue[500],
                                    marginLeft: "10px"
                                }}
                                onClick={() => handleFollow(user.id)}
                            />
                        </Box>
                        <Box sx={{
                            marginLeft: "50px"
                        }}>
                            <Typography variant="body1">email: {user.email}</Typography>
                            <Typography variant="h5" sx={{marginX: 'auto', marginTop: 2}}>{user.bio}</Typography>
                        </Box>
                    </CardContent>
                </>
            ))}
        </Box>
    )
}

export default ExplorePage;