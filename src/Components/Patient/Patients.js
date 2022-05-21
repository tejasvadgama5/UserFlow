
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import classes from '../style.module.css';
import { AppBar, Container, Toolbar, IconButton, Typography, Button, Grid, InputBase, Modal } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import PatientDetail from "./PatientDetail";
import { getPatients, searchPatient } from "../../Redux/Patient/PatientAction";
import { useSelect } from "@mui/base";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBased = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const columns = [
    {
        field: 'id',
        headerName: 'Num',
        width: 90,
        key: 0,
        type: 'number',
        valueGetter: (params) =>
            `${params.row.id}`,
    },
    {
        key: 1,
        field: 'name',
        headerName: 'Patient Name',
        width: 160,
        type: 'string',
        editable: true,
        valueGetter: (params) =>
            `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
]

const Patients = () => {
    const logindata = useLocation().state
    const dispatch = useDispatch()
    const patients = useSelector((state) => state.patients)
    const searchPat = useSelector((state) => state.search)

    const patientDetail = useSelector((state) => state?.patient)
    const {
        addPatient
    } = patientDetail;

    const editPatientDetail = useSelector((state) => state?.epatient)
    const {
        editPatient
    } = editPatientDetail;

    const {
        searchPatient: sp
    } = searchPat;


    useEffect(() => {
        setRows(sp)
    }, [sp])

    const [rows, setRows] = React.useState([]);
    useEffect(() => {
        dispatch(getPatients())
    }, [addPatient, editPatient])

    useEffect(() => {
        setRows(patients.getPatients)

    }, [patients.getPatients])



    const navigate = useNavigate();
    const logoutHandler = () => {
        navigate("/Logout")
    }
    const [patientData, setPatientData] = useState();
    const detailHandler = (params) => {
        const data = params.row
        setPatientData(data);
        handleOpen1()
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (key) => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = (key) => setOpen1(false);

    const [search, setSearch] = useState('');
    const searchHandler = (event) => {
        setSearch(event.target.value)
        dispatch(searchPatient(search))

    }

    return (
        <React.Fragment>
            <Container className={classes.body}>
                <AppBar position="static" sx={{ background: '#000' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
                            Patients
                        </Typography>
                        <Button onClick={logoutHandler} sx={{ border: '1px solid white', color: '#fff' }}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={0} direction='row' justifyContent="flex-end" alignItems='center' sx={{ marginTop: 2 }}>
                    <Grid item xs={2}>
                        <Button sx={{ border: '1px solid black', color: '#000' }} onClick={handleOpen}>Add</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}>

                            <PatientDetail onClick={handleClose} />
                        </Modal>
                    </Grid>
                    <Grid item xs={4}>

                        <Search sx={{ border: '1px solid black', color: 'black', width: 70 }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBased
                                placeholder="Search....."
                                inputpprops={{ 'aria-label': 'search' }}
                                onChange={searchHandler} />
                        </Search>
                    </Grid>
                </Grid>
                <div style={{ height: 500, width: '100%', marginTop: 20 }}>
                    {rows && <DataGrid
                        rows={rows}
                        columns={columns}
                        onCellClick={detailHandler}
                    />}
                    {patientData && <Modal
                        open={open1}
                        onClose={handleClose1}>
                        <PatientDetail
                            modal_type={"edit"}

                            onClick={handleClose1} pat={patientData} />
                    </Modal>}
                </div>
            </Container>
        </React.Fragment>
    )
};
export default Patients;