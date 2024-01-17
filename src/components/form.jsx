import React, { useContext, useState } from 'react';
import { Button, Input, Paper, TextField, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Alert } from '@mui/material';

const PostForm = () => {

  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const [posted, setPosted] = useState(false);
  const [path, setPath] = useState('');
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handlePathChange = (event) => {
    setPath(event.target.value);
  }

  const authCtx = useContext(AuthContext);

  const handleSubmit = () => {
    if (content == "" || path == "") {
      setTimeout(() => {
        setError(false)
      }, 3000);
      setError(true)
      return false;
    }

    try {
      axios.post('http://localhost:8080/api/v1/publication/addpub', {
        "text": content,
        "user": {
          "id": authCtx.id,
          "role": authCtx.role
        },
        "imagePath": path
      }).then((response) => {
        if (response.status != 200) {
          // setTimeout(() => {
          //   setError(false)
          // }, 3000)
          setError(true)
        } else {
          // setTimeout(() => {
          //   setPosted(false)
          // }, 3000)
          setPosted(true)
        }
        setContent('');
        setPath('');
      }
      )
    } catch (e) { }
  }

  return (
    <Paper
      sx={{
        padding: '10px',
        marginBottom: '4px',
        mx: 'auto',
        width: '55%',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center children horizontally
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create a New Post
      </Typography>
      <TextField
        sx={{
          width: '60%',
          marginBottom: '4px',
        }}
        label="Write something..."
        variant="outlined"
        multiline
        rows={4}
        value={content}
        onChange={handleContentChange}
      />
      <TextField
        margin="normal"
        required
        id="path"
        label="Picture Path"
        name="path"
        value={path}
        autoComplete="path"
        autoFocus
        sx={{
          width: '60%',
          marginBottom: '4px',
        }}
        onChange={handlePathChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          marginTop: '4px',
        }}
      >
        Post
      </Button>
      {error && (
        <Alert variant="outlined" severity="error" sx={{ marginTop: '4px' }}>
          There has been an error posting.
        </Alert>
      )}
      {posted && (
        <Alert variant="outlined" severity="success" sx={{ marginTop: '4px' }}>
          Posted Successfully
        </Alert>
      )}
    </Paper>


  );
};

export default PostForm;
