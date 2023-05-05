import React, { useEffect, useState } from "react";
import { Alert, Avatar, Box, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Redux/services/user.service";

export const Profile = () => {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [errorMessages, setErrorMessages] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        getUser()
            .then((response) => {
                setUserData(response.data);
                setErrorMessages('');
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    navigate("/logout");
                } else {
                    setErrorMessages(error.response.data.message);
                }
            });
    }, [navigate]);
    const cardData = () => {
        return (
            <>
                <Avatar sx={{ bgcolor: deepOrange[500], fontSize: "52px", width: 75, height: 75 }}>{userData?.name.charAt(0)}</Avatar>
                <Typography variant="h2" color="warning" gutterBottom>
                    {userData?.name}
                </Typography>
                <Typography variant="h5" component="div">
                    {userData?.email}
                </Typography>
                <Typography variant="body2" marginTop={5}>
                    Don't walk behind me; I may not lead. Don't walk in front of me; I may not follow. Just walk beside me and be my friend.
                </Typography>
            </>
        )
    }
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={400}
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
                "&:hover": {
                    boxShadow: "10px 10px 20px #ccc"
                },
            }}
        >
            {errorMessages ? <Alert severity="error">{errorMessages}</Alert> : cardData()}
        </Box >
    )
}