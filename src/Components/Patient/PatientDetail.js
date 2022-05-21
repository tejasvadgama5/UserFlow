import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import classes from '../style.module.css';
import { AppBar, Container, Toolbar, IconButton, Typography, Button, Grid, Card, CardActions, CardContent, TextField } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { addPatient, editPatient } from "../../Redux/Patient/PatientAction";
const PatientDetail = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const goBackHandler = () => {
        navigate("/Patients")
    }
    const [values, setValues] = React.useState({
        username: props?.pat?.username,
        first_name: props?.pat?.first_name,
        last_name: props?.pat?.last_name,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const onSubmit = data => {

        dispatch(props?.modal_type == "edit" ? editPatient({ data: values }, props?.pat?.id) : addPatient({ data: values }));
        props.onClick()
    }


    return (
        <React.Fragment>
            <Card
                variant="outlined"
                sx={{ maxHeight: 600, maxWidth: 600, border: '1px solid black', margin: 30, marginTop: 10, borderRadius: 5, padding: 1 }}

                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardActions>
                    <IconButton sx={{ marginLeft: 1, }} onClick={props.onClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </CardActions>
                <CardContent>
                    <Typography variant="h4" component='div' fontSize='26px'>Patient Details</Typography>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ marginTop: 1 }}

                                id="username"
                                label="Username"
                                placeholder="xyz abc"

                                {...register('username', { required: true, maxLength: 100 })}
                                error={!!errors?.username}
                                helpertext={errors?.username ? errors.username.message : null}
                                value={values?.username}
                                onChange={handleChange('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ marginTop: 1 }}

                                id="first_name"
                                label="Firstname"
                                placeholder="xyz abc"
                                name="first_name"
                                {...register('firstname', { required: true, maxLength: 100 })}
                                error={!!errors?.firstname}
                                helpertext={errors?.firstname ? errors.firstname.message : null}
                                value={values?.first_name}
                                onChange={handleChange('first_name')}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                sx={{ marginTop: 1 }}
                                id="last_name"
                                label="LastName"
                                placeholder="xyz abc"
                                name="last_name"
                                {...register('lastname', { required: true, maxLength: 100 })}
                                error={!!errors?.lastname}
                                helpertext={errors?.lastname ? errors.lastname.message : null}
                                value={values?.last_name}
                                onChange={handleChange('last_name')}
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
                                Submit</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </React.Fragment>
    )
};
export default PatientDetail;
