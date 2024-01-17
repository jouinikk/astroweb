import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Box, Divider, Tabs, Tab, Card, CardHeader, CardContent, Typography, Avatar } from "@mui/material";
import Post from "../../components/post";
import FollowersList from "../../components/followersList";
import FollowingsList from "../../components/followinglist";

const Profile = () => {

    const authCtx = useContext(AuthContext);
    const id = authCtx.id;
    const firstName = authCtx.firstName;
    const lastName = authCtx.lastName;
    const email = authCtx.email;
    const bio = authCtx.bio;
    const profilePic = authCtx.profilePic;
    const [posts, setPosts] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const getPosts = () => {
        try {
            axios.get(`http://localhost:8080/api/v1/publication/user/${id}`).then((response) => {
                setPosts(response.data);
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    const handlePostDelete = () => {
        getPosts();
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <Box className='container'>
            <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={profilePic} alt={firstName} sx={{ width: 80, height: 80 }} />
                        <Box sx={{ marginLeft: 2 }}>
                            <Typography variant="h6">{firstName} {lastName}</Typography>
                            <Typography color="textSecondary" variant="body2">{email}</Typography>
                            <Typography color="textSecondary" variant="body2">{bio}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Posts" />
                <Tab label="Followers" />
                <Tab label="Following" />
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
                            <Post
                                id={post.id}
                                text={post.text}
                                user={post.user}
                                image={post.imagePath}
                                date={post.createdAt}
                                deletable={true}
                                flaggable={false}
                                onPostDelete={handlePostDelete}
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
    );
}
export default Profile;