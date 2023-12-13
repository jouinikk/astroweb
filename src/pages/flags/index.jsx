import { Card, CardContent, CardHeader, Modal, Typography, colors } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../../components/post";
import { Delete } from "@mui/icons-material";

const Flags = () => {
    const [flags, setFlags] = useState([]);
    const [open, setOpen] = useState(false);
    const getFlags = async () => {
        await axios.get("http://localhost:8080/api/v1/flags").then((response) => {
            setFlags(response.data);
        })
    }

    const handleDelete = async(id)=>{
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/flags/delete/${id}`);
                getFlags();
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    }

    useEffect(() => {
        getFlags();
    }, [])

    return (
        <>
            {flags.map((flag) => (
                <>
                    <Card sx={{
                        marginBottom: '5px',
                        marginTop: '5px',
                    }} className="container">
                        <Delete
                            sx={{
                                marginTop: '20px',
                                marginRight: '20px',
                                float: 'right'
                            }}
                            onClick={()=>{handleDelete(flag.id)}}
                        />
                        <CardContent>
                        <Typography> this post was Flagged by  {flag.user.firstName} {flag.user.lastName}
                            &nbsp;on : {flag.createdAt}</Typography>
                            <PostCard
                                id={flag.publication.id}
                                text={flag.publication.text}
                                user={flag.publication.user}
                                image={flag.publication.imagePath}
                                date={flag.publication.createdAt}
                            />
                        </CardContent>
                    </Card>
                </>
            ))}
        </>
    )
}

export default Flags;
