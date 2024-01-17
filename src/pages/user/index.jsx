import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, Divider, Tab, Tabs, Typography, colors } from "@mui/material";
import PostCard from "../../components/post";
import { AuthContext } from "../../context/AuthContext";
import { Add, AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import FollowersList from "../../components/followersList";
import FollowingsList from "../../components/followinglist";

const UserProfile = () => {

    const param = useParams();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [following, setFollowing] = useState(false)
    const id = param.id
    const [tabValue,setTabValue] = useState(0)
    const authCtx = useContext(AuthContext)
    const getUser = () => {
        try {
            axios.get(`http://localhost:8080/api/v1/user/user/${id}`).then((response) => {
                setUser(response.data);
            });
        } catch (e) { }

    }
    const getPosts = () => {
        try {
            axios.get(`http://localhost:8080/api/v1/publication/user/${id}`).then((response) => {
                setPosts(response.data);
            })
        } catch (error) {

        }
    }
    const getFollowing = async () => {
        try {
            await axios.get(`http://localhost:8080/api/v1/user/isfollowing/${authCtx.id}/${id}`).then((response) => {
                setFollowing(response.data);
            })
        } catch (error) {

        }
    }
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const unFollow = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/user/unfollow/${authCtx.id}/${id}`).then(() => {
                getFollowing();
            })
        } catch (error) {

        }
    }

    const follow = async () => {
        await axios.post('http://localhost:8080/api/v1/user/follow', {
            follower: authCtx.id,
            following: id
        }).then((response) => {
            if (response.status == 200) {
                getFollowing();
            } else {
                alert("there was a problem ! please try again.");
            }
        })
    }

    const [followers,setFollowers]=useState([]);

    const getFollowers = async()=>{
        const response = await axios.get(`http://localhost:8080/api/v1/user/followers/${id}`);
        setFollowers(response.data);
    }

    const [followings, setFollowings] = useState([]);

  const getFollowings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/following/${id}`);
      setFollowings(response.data);
    } catch (error) {
    }
  }

    useEffect(() => {
        getPosts()
        getUser()
        getFollowing()
        getFollowers()
        getFollowings()
    }, [])

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Box className="container" sx={{
            width: '70%',
            marginX: 'auto',
            marginTop: '20px'
        }}>
            <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={user.profilePic} alt={user.firstName} sx={{ width: 80, height: 80 }} />
                        <Box sx={{ marginLeft: 2 }}>
                            <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                            <Typography color="textSecondary" variant="body2">{user.email}</Typography>
                            <Typography color="textSecondary" variant="body2">{user.bio}</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!following && (
                            <AddCircleOutline
                                sx={{
                                    float: 'right',
                                    color: colors.blue[500],
                                }}
                                onClick={follow}
                            />
                        )}
                        {following && (
                            <RemoveCircleOutline
                                sx={{
                                    float: 'right',
                                    color: colors.red[500],
                                }}
                                onClick={unFollow}
                            />
                        )}
                    </Box>
                </CardContent>

            </Card>
            <Box sx={{
                marginTop: "20px"
            }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Posts" />
                    <Tab label={`Followers(${followers.length})`} />
                    <Tab label={`Following(${followings.length})`} />
                </Tabs>
                {tabValue === 0 &&
                    <>
                        {posts.map((post, index) => (
                            <Box
                                key={index}
                                sx={{
                                    alignContent: "inline",
                                    p: 3
                                }}
                            >
                                <PostCard
                                    id={post.id}
                                    text={post.text}
                                    user={post.user}
                                    image={post.imagePath}
                                    date={post.createdAt}
                                    deletable={false}
                                    flaggable={true}
                                />
                            </Box>
                        ))}
                    </>
                }
                {
                    tabValue === 1 &&
                    <>
                        <FollowersList id={id} />
                    </>
                }
                {
                    tabValue === 2 &&
                    <>
                        <FollowingsList id={id} />
                    </>
                }
            </Box>
        </Box>
    );
}
export default UserProfile;