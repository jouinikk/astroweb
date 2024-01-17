import { Routes, Route } from "react-router-dom";
import Profile from "../profile";
import Post from "../../components/post"
import { Grid, Box, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PostForm from "../../components/form";
import { AuthContext } from "../../context/AuthContext";
import PostCard from "../../components/post";


const Home = () => {    

  const authCtx = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([])
  const getFollowings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/following/${authCtx.id}`);
      setFollowing(response.data);
    } catch (error) {
    }
  }
  const getPosts = async () => {
    try {
      await axios.get("http://localhost:8080/api/v1/publication",
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
          }
        }).then((response) => {

          setPosts(response.data);
        })
    } catch (e) { }
  }

  useEffect(() => {
    console.log("following", following, 'id:', authCtx.id);
  }, [following])

  const filteredPosts = posts.filter(post => {
    const postUserId = post.user.id; // Replace with the actual property that represents the user ID in your post object
    return following.some(follow => follow.id === postUserId);
  });


  useEffect(() => {
    getPosts()
    getFollowings()
  }, [])


  return (
    <>
      <PostForm />
      {filteredPosts.map((post, index) => (
        <>
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
              flaggable={true}
            />
          </Box>
        </>
      ))}
    </>
  );
}
export default Home;
