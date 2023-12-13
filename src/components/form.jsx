import React, { useContext, useState } from 'react';
import { Button, Input, Paper, TextField, Typography} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {Alert} from '@mui/material';

const PostForm = () => {

  const [content, setContent] = useState('');
  const [error,setError] = useState(false);
  const [posted,setPosted] = useState(false);
  const [path,setPath] = useState('');
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handlePathChange = (event)=>{
    setPath(event.target.value);
  }

  const authCtx = useContext(AuthContext);

  const handleSubmit = () =>{
    try{
    axios.post('http://localhost:8080/api/v1/publication/addpub',{
        "text": content,
        "user": {
            "id": authCtx.id,
            "role": authCtx.role
        },
        "imagePath":path
    }).then((response)=>{
      if(response.status != 200){
      // setTimeout(()=>{
      //   setError(false)
      // },3000)
      setError(true)
       }else{
      //   setTimeout(()=>{
      //     setPosted(false)
      //   },3000)
        setPosted(true)
      }
      setContent('');
    }
    )
  }catch(e){}
  }

  return (
    <Paper  sx={{    
        padding: '10px',
        marginBottom: '4px',
        mx:'auto', 
        width: '55%',
        alignContent:'center'
      }}>
      <Typography variant="h6" gutterBottom>
        Create a New Post
      </Typography>
      <TextField
        sx={{
            mx:'auto',
            width: '80%',
            marginBottom: '4px',
        }}
        label="Write something..."
        variant="outlined"
        multiline
        rows= {4}
        value={content}
        onChange={handleContentChange}
      /><br/>              
      <TextField
        margin="normal"
        required
        fullWidth
        id="path"
        label="Picture Path"
        name="path"
        value={path}
        autoComplete="path"
        autoFocus
      />
      <Button
        sx={{
            marginRight: '4px',
        }}
        variant="contained"
        color="primary"                                                                                                                              
        onClick={handleSubmit}
      >
        Post
      </Button>
      {error &&
         <Alert variant="outlined" severity="error">
            there has been an error posting
          </Alert>
      }
      {posted &&
         <Alert variant="outlined" severity="success">
            Posted Successfully
          </Alert>
      }
    </Paper>
  );
};

export default PostForm;
