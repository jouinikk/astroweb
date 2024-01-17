import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Modal, Typography, colors, Divider, Collapse, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { AddCircle, AddCircleOutline, AddReaction, Close, Delete, Favorite, FavoriteBorder, Flag, HearingTwoTone, HeartBroken } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const PostCard = ({ id, user, text, image, date, flaggable, deletable, onPostDelete }) => {
  const [open, setOpen] = useState(false);
  const [inappropriate, setInappropriate] = useState(false);
  const [irrelevant, setIrrelevant] = useState(false);
  const [harrasment, setHarrasment] = useState(false);
  const [copyrights, setCopyrights] = useState(false);
  const [details, setDetails] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authCtx = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState("")
  const [isLiking, setIsLiking] = useState(false)

  const toggleComments = () => {
    setCommentsOpen(!commentsOpen);
  }

  const handleSubmit = async () => {
    let message = "The user :" + authCtx.firstName + " " + authCtx.lastName + " has flgged " + user.firstName + " " + user.lastName + "'s post"
      + " " + id;
    if (inappropriate || irrelevant || harrasment || copyrights) {
      message += " for: \n";
      if (inappropriate) message = message + "inappropriate\n";
      if (irrelevant) message = message + "irrelevant\n";
      if (harrasment) message = message + "harrasment\n";
      if (copyrights) message = message + "copyrights infringment \n";
    }
    if (details != "") message += "details: " + details

    await axios.post("http://localhost:8080/api/v1/flags/addFlag", {
      userId: authCtx.id,
      publicationId: id,
      text: message
    }).then((response) => {
      response.status == 200 ? alert("thank you for your feedBack") : alert("feedBack has not been sent");
    })

  }

  const handleDelete = async () => {
    if (window.confirm("are you sure")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/publication/${id}`);
        onPostDelete();
      } catch (error) {
        alert(error)
      }
    }
  }

  const handleDetails = (event) => {
    setDetails(event.target.value);
  }

  const getLikesAndComments = async () => {
    await axios.get(`http://localhost:8080/api/v1/publication/like/${id}`).then((response) => {
      setLikes(response.data)
    })
    await axios.get(`http://localhost:8080/api/v1/publication/comment/${id}`).then((response) => {
      setComments(response.data)
    })

    await axios.get(`http://localhost:8080/api/v1/publication/hasLikes/${authCtx.id}/${id}`).then((response) => {
      setIsLiking(response.data)
    })

  }

  const handleAddComment = async () => {
    if (newComment == "") {
      alert('you cant add an empty comment')
      return false;
    }
    await axios.post('http://localhost:8080/api/v1/publication/comment', {
      userId: authCtx.id,
      pubId: id,
      content: newComment
    }).then((response) => {
      getLikesAndComments();
      setNewComment("");
    })
  }

  const like = async () => {
    await axios.post(`http://localhost:8080/api/v1/publication/like`, {
      userId: authCtx.id,
      pubId: id
    }).then(() => {
      getLikesAndComments();
    })
    console.log("Clicked");
  }

  const unlike = async () => {
    await axios.delete(`http://localhost:8080/api/v1/publication/unlike/${authCtx.id}/${id}`).then(() => {
      getLikesAndComments();
    })
    console.log("unClicked");
  }

  useEffect(() => {
    getLikesAndComments()
  }, [])

  return (
    <>
      <Card sx={{
        mx: 'auto',
        width: '50%',
        marginBottom: '4px',
      }}>
        <CardContent >
          {flaggable && <Flag onClick={handleOpen}
            sx={{
              color: colors.blue[500],
              float: 'right'
            }}
          />}
          {deletable && <Delete
            sx={{
              color: colors.blue[500],
              float: 'right'
            }}
            onClick={handleDelete}
          />
          }
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/profile/${user.id}`}>
              <Box sx={{ display: 'inline-flex' }}>
                <Avatar src={`${user.profilePic}`} alt={user.firstName} />
                <Typography sx={{ fontWeight: 'bold', marginLeft: '5px', marginTop: 1 }} variant="subtitle1">
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
            </Link>
            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 'auto', marginRight: '5px' }}>
              {date}
            </Typography>
          </Box>
          <Typography variant="body1">{text}</Typography>
          {/* <Button sx={{
          padding :0,
          marginLeft:0,
          marginRight:0
        }}>
          <AddReaction/>
        </Button>
         */}
          <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
            <img src={`${image}`} alt="Post Image" style={{ maxWidth: '100%' }} />
          </Box>
          <Box sx={{
            marginTop: "5px"
          }}>
            <hr />
            {isLiking &&
              <>
                <Favorite sx={{
                  color: colors.red[500]
                }}
                  onClick={unlike}
                /><br />
              </>
            }
            {!isLiking &&
              <>
                <FavoriteBorder sx={{
                  color: colors.red[500]
                }}
                  onClick={like}
                /><br />
              </>
            }
            <small>
              {likes.length} {likes.length == 1 ? " Like " : " Likes"}
              <Box sx={{
                float: 'right'
              }}
                onClick={toggleComments}
              >
                {comments.length} {comments.length == 1 ? "Comment" : "Comments"}
              </Box>
            </small>
            <Collapse in={commentsOpen}>
              <Box sx={{ display: 'flex', marginTop: '10px', marginX: 'auto' }}>
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  width="60%"
                  size="small"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ marginBottom: '5px' }}
                />
                <AddCircleOutline
                  sx={{
                    marginTop: 1,
                    marginLeft: 1,
                    fontSize: 30,
                    color: colors.blue[500]
                  }}
                  onClick={handleAddComment}
                />
              </Box>

              <Box>
                {comments.map((comment, index) => (
                  <Box key={index} sx={{ display: 'flex', marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>
                    <Link to={`/profile/${comment.userid.id}`}>
                      <Avatar src={comment.userid.profilePic} alt={comment.userid.firstName} />
                    </Link>
                    <Box sx={{ marginLeft: '10px' }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        <Link to={`/profile/${comment.userid.id}`}>
                          {comment.userid.firstName} {comment.userid.lastName}
                        </Link>
                      </Typography>
                      <Typography>{comment.content}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          padding: '5px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          // border: '2px solid #000',
          backgroundColor: colors.grey[50]
        }}
      >
        <>
          <Close
            sx={{
              float: 'right'
            }}
            onClick={handleClose}
          />
          Flag The Post :{id}<br />

          Reason:<br></br>
          <input onChange={() => setInappropriate(!inappropriate)} type='checkbox' id="inappropriate" /> Inappropriate<br />
          <input onChange={() => setIrrelevant(!irrelevant)} type='checkbox' id="irrelevant" /> Irrelevant<br />
          <input onChange={() => setHarrasment(!harrasment)} type='checkbox' id="harrasment" /> Harrasment<br />
          <input onChange={() => setCopyrights(!copyrights)} type='checkbox' id="copyrights" /> Copyrights infreingment<br /><br />
          Give us more details:<br />
          <textarea onChange={handleDetails} id="other"></textarea><br></br>
          <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
        </>
      </Modal>
    </>
  );
};
export default PostCard;
