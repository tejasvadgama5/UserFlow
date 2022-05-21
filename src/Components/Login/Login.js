import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import classes from '../style.module.css';
import { Card, CardContent, CardActions, Container, Grid, Box, TextField, Button, Typography, InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import key from "../static/icons/key.png";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { getLoginData } from "../../Redux/auth/AuthAction";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',

        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,

        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const navigateHome = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const logindata = JSON.parse(localStorage.getItem("userInfo"))

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const goBackHandler = () => {
        navigate("/")
    }
    const changePasswordHandler = () => {
        if (logindata !== null) {
            navigate("/")
        }

    }
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

    };
    const onSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
        dispatch(getLoginData(data));
        navigate("/Patients", { state: data });

    };




    return (
        <React.Fragment>
            <Container sx={{ justifyContent: 'center' }} className={classes.body}>
                <Card sx={{ maxHeight: 600, maxWidth: 600, border: '1px solid black', margin: 30, marginTop: 10, borderRadius: 5, padding: 1 }}>
                    <CardActions >
                        <IconButton sx={{ marginLeft: 1 }} onClick={goBackHandler}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </CardActions>
                    <CardContent>
                        <h2 >Sign In Here</h2>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                alt="User"
                                // src=
                                sx={{ width: 56, height: 56, borderWidth: 5, borderColor: "#121212" }}
                                position='sticky'
                            />
                        </StyledBadge>
                        <Box
                            component="form"
                            sx={{
                                marginTop: 5,
                                '& .MuiTextField-root': { m: 1, width: '40ch' },
                                '& .MuiButton-root': { textColor: '#121212' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <AccountCircle sx={{ color: 'black', mr: 1, my: 0.5, marginTop: 3, marginRight: -0.3 }} />
                                    <TextField
                                        sx={{
                                            color: 'action.home',
                                            borderColor: '#121212',
                                            '&:onFocus': {
                                                borderColor: '#121212',
                                            },
                                        }}
                                        required
                                        id="email"
                                        label="Enter Email Address"
                                        placeholder="xyz@abc.com"
                                        {...register('email', {
                                            required: true, pattern: {
                                                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i,
                                                message: "Invalid Email Address",
                                            },
                                        })}
                                        error={!!errors?.email}
                                        helpertext={errors?.email ? errors.email.message : null}
                                        onChange={handleChange('email')}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <img width="23" src={key} alt="key" style={{ color: 'black', mr: 1, my: 0.5, marginTop: '25px', marginRight: -0.3 }}></img>
                                    <TextField
                                        sx={{ marginTop: 1 }}
                                        autoComplete="true"
                                        required
                                        label="Enter Password"
                                        placeholder='*******'
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        {...register('password', { required: true })}

                                        onChange={handleChange('password')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        sx={{
                                            marginTop: 0.5,
                                            marginRight: -38.5,
                                            color: 'black',
                                            border: '1px solid black',
                                        }}
                                    >
                                        Sign In</Button>
                                </Grid>

                                <Grid item xs={12} >
                                    <Typography variant="body1" sx={{ marginTop: 0.5, marginLeft: -9, color: 'black', }}>
                                        Don't You Have An Account?    <Link to={"/"}>
                                            Sign Up
                                        </Link>
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginTop: 1, marginLeft: -26, color: 'black', }}>
                                        <Link to={"/"} >
                                            Forgot Password?
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" sx={{ color: 'black' }} onClick={changePasswordHandler}>Change Password</Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment >
    )
};
export default Login;