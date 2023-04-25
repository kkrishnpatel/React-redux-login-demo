import React, { Fragment, useEffect, useRef, useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/actions/auth";
import LoadingButton from '@mui/lab/LoadingButton';
import { clearMessage } from "../redux/actions/message";

export const SignUp = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const [isSignup, setIsSignUp] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let ref1 = useRef("null");
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/profile");
        }
    }, [isLoggedIn, navigate]);
    useEffect(() => {
        setIsSignUp(location.pathname !== "/login")
    }, [location.pathname]);

    useEffect(() => {
        if (isSignup) {
            ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
                if (value !== inputs.password) {
                    return false;
                }
                return true;
            });
            ref1.validate(inputs.confirmPassword);
        } else {
            ValidatorForm.removeValidationRule("isPasswordMatch");
        }
    }, [inputs.password, isSignup, inputs.confirmPassword]);

    useEffect(() => {
        navigate(isSignup ? "/register" : "/login")
    }, [isSignup, navigate]);

    const handleChange = (e) => {
        const { name, value } = e["target"];
        setInputs((preState) => ({
            ...preState,
            [name]: value
        }))
    }

    const resetData = () => {
        dispatch(clearMessage());
        setIsSignUp(!isSignup);
        setInputs({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = inputs;
        if (isSignup) {
            const { name } = inputs;
            dispatch(register(name, email, password))
                .then(() => {
                    navigate("/profile");
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            // Login API call
            dispatch(login(email, password))
                .then(() => {
                    navigate("/profile");
                })
                .catch((e) => {
                    setLoading(false);
                });
        }
    }
    return (
        <Fragment>
            <ValidatorForm onSubmit={handelSubmit}>
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
                    <Typography
                        variant="h2"
                        padding={3}
                        textAlign={"center"}>
                        {isSignup ? "Register" : "Login"}
                    </Typography>
                    {isSignup &&
                        <TextValidator
                            label="Name"
                            margin={"normal"}
                            variant="outlined"
                            placeholder="Name"
                            value={inputs.name}
                            name="name"
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["Name is required"]}
                        />
                    }
                    <TextValidator
                        label="Email"
                        onChange={handleChange}
                        name="email"
                        value={inputs.email}
                        validators={["required", "isEmail"]}
                        errorMessages={["Email is required", "Email is not valid"]}
                    />
                    <TextValidator
                        // ref={ref1}
                        label="Password"
                        margin={"normal"}
                        type={"password"}
                        variant="outlined"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        validators={["required", 'matchRegexp:^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$']}
                        errorMessages={["Password is required", "Password should be strong"]}
                    />
                    {isSignup &&
                        <TextValidator
                            ref={r => (ref1 = r)}
                            label="Confirm Password"
                            margin={"normal"}
                            type={"password"}
                            variant="outlined"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                            validators={["required", "isPasswordMatch"]}
                            errorMessages={["Password is required", "password mismatch"]}
                        />
                    }
                    {message && <Alert severity="error">{message}</Alert>}
                    <LoadingButton
                        disabled={loading}
                        loading={loading}
                        sx={{ marginTop: 3, borderRadius: 3, textTransform: "none" }}
                        variant={"contained"} color={"info"}
                        type="submit"
                    >Submit</LoadingButton>
                    <Button
                        sx={{ marginTop: 3, borderRadius: 3, textTransform: "none" }}
                        onClick={resetData}
                    >Change to {isSignup ? "Login" : "Register"}
                    </Button>
                </Box>
            </ValidatorForm>
        </Fragment>
    )
}