import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Button, colors } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = ()=>{
    axios.get("http://localhost:8080/api/v1/user/users").then((response) => {
      setUsers(response.data)
    })
  }
  useEffect(()=>{
    getUsers();
  },[])
  

  const handleLock = async(id) => {
    let response = null;
    try {
      response = await axios.patch(`http://localhost:8080/api/v1/user/lock/${id}`);
      if(response.status == 200){
        getUsers();
        alert("user "+id+" has been locked")
      }else alert("user something went wrong")
    } catch (error) {   
      alert(error)
    }
  }

  const handleUnlock = async(id) => {
    let response = null;
    try {
      response = await axios.patch(`http://localhost:8080/api/v1/user/unlock/${id}`);
      if(response.status == 200){
        getUsers();
        alert("user "+id+" has been unlocked")
      }else alert("user something went wrong")
    } catch (error) {   
      alert(error)
    }
  }

  const columns = [
    { id: 1, field: 'id', headerName: 'ID', width: 90 },
    {
      id: 2,
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      id: 3,
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      id: 4,
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      id: 5,
      field: 'role',
      headerName: 'Role',
      width: 110,
    },{
      id: 6,
      headerName: 'Lock Account',
      width: 110,
      renderCell: (param) => (
        <>
        {param.row.locked==false &&
          <Button
            sx={{
              borderRadius: 100,
              color: colors.red[500]
            }}
            onClick={() => handleLock(param.row.id)} // Pass the user's ID
          >
            lock
          </Button>
        }
        {
          param.row.locked==true &&
          <Button
            sx={{
              color: colors.green[500],
              borderRadius: 100,
            }}
            onClick={() => handleUnlock(param.row.id)} // Pass the user's ID
          >
            Unlock
          </Button>
        }
        </>
      ),
    },
  ];


  return (
    <>
      <DataGrid
        sx={{
          width:'60%',
          marginX:'20%',
          marginTop:"5%"
        }}
        rows={users}
        columns={columns}
        getRowId={(user) => user.id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </>
  )
}

export default Users; 