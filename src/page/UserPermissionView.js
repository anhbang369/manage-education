import React from 'react';
import { useState, useEffect } from 'react';
import "./userPermission.css";
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getRoleAuthorities } from '../services/AuthoritiesService';
import { getRolePermission, updateRolePermission } from "../services/RoleService";

const UserPermissionView = () => {
    const [role, setRole] = useState(null);
    const [superSyllabus, setSuperSyllabus] = useState(null);
    const [superTraining, setSuperTraining] = useState(null);
    const [superClass, setSuperClass] = useState(null);
    const [superMaterial, setSuperMaterial] = useState(null);
    const [classSyllabus, setClassSyllabus] = useState(null);
    const [classTraining, setClassTraining] = useState(null);
    const [classClass, setClassClass] = useState(null);
    const [classMaterial, setClassMaterial] = useState(null);
    const [trainerSyllabus, setTrainerSyllabus] = useState(null);
    const [trainerTraining, setTrainerTraining] = useState(null);
    const [trainerClass, setTrainerClass] = useState(null);
    const [trainerMaterial, setTrainerMaterial] = useState(null);
    const [studentSyllabus, setStudentSyllabus] = useState(null);
    const [openNo, setOpenNo] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleCloseNo = () => {
        setOpenNo(false);
    };


    //get component
    //super admin
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'SUPER_ADMIN';
                const re = 'SYLLABUS'
                const data = await getRoleAuthorities(ro, re);
                setSuperSyllabus(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'SUPER_ADMIN';
                const re = 'TRAINING_PROGRAM'
                const data = await getRoleAuthorities(ro, re);
                setSuperTraining(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'SUPER_ADMIN';
                const re = 'CLASS'
                const data = await getRoleAuthorities(ro, re);
                setSuperClass(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'SUPER_ADMIN';
                const re = 'LEARNING_MATERIAL'
                const data = await getRoleAuthorities(ro, re);
                setSuperMaterial(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //class admin
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'CLASS_ADMIN';
                const re = 'SYLLABUS'
                const data = await getRoleAuthorities(ro, re);
                setClassSyllabus(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'CLASS_ADMIN';
                const re = 'TRAINING_PROGRAM'
                const data = await getRoleAuthorities(ro, re);
                setClassTraining(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'CLASS_ADMIN';
                const re = 'CLASS'
                const data = await getRoleAuthorities(ro, re);
                setClassClass(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'CLASS_ADMIN';
                const re = 'LEARNING_MATERIAL'
                const data = await getRoleAuthorities(ro, re);
                setClassMaterial(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //trainer
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'TRAINER';
                const re = 'SYLLABUS'
                const data = await getRoleAuthorities(ro, re);
                setTrainerSyllabus(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'TRAINER';
                const re = 'TRAINING_PROGRAM'
                const data = await getRoleAuthorities(ro, re);
                setTrainerTraining(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'TRAINER';
                const re = 'CLASS'
                const data = await getRoleAuthorities(ro, re);
                setTrainerClass(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'TRAINER';
                const re = 'LEARNING_MATERIAL'
                const data = await getRoleAuthorities(ro, re);
                setTrainerMaterial(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //student
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ro = 'STUDENT';
                const re = 'SYLLABUS'
                const data = await getRoleAuthorities(ro, re);
                setStudentSyllabus(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRolePermission();
                setRole(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //first chart cap
    const capitalizeFirstLetter = (str) => {
        str = str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        return str && str.replace(/_/g, ' ');
    };

    //update role permission db
    const handleButtonClick = async () => {
        try {
            const response = await updateRolePermission(role);
            setNotificationMessage('Update successful.' + response);
            setOpenNo(true);
        } catch (error) {
            console.error("Error updating role permissions:", error);
        }
    };

    const renderPermissionIcon = (permission) => {
        switch (permission) {
            case 'NO_ACCESS':
                return <i className="bi bi-eye-slash"></i>;
            case 'FULL_ACCESS':
                return <i className="bi bi-star"></i>;
            case 'MODIFY':
                return <i className="bi bi-pencil"></i>;
            case 'CREATE':
                return <i className="bi bi-plus-circle"></i>;
            case 'VIEW':
                return <i className="bi bi-eye"></i>;
            default:
                return null;
        }
    };


    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0'>
                        <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                            <div>
                                <h4 className='ms-9 border-bottom border-black bg-core text-white border border-white p-1'>User Permission</h4>
                                <div className='d-flex justify-content-end'><a href='/permission-update' className='p-1 rounded text-white border border-white mb-3 bg-core text-decoration-none'><i className="bi bi-pencil"></i> Update</a></div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: '#47505f' }}>
                                            <TableRow>
                                                <TableCell className='p-1 text-white'>Role name<i class="bi bi-filter-left"></i></TableCell>
                                                <TableCell align="left" className='p-1 text-white'>Syllabus<i class="bi bi-filter-left"></i></TableCell>
                                                <TableCell align="left" className='p-1 text-white'>Training program<i class="bi bi-filter-left"></i></TableCell>
                                                <TableCell align="left" className='p-1 text-white'>Class<i class="bi bi-filter-left"></i></TableCell>
                                                <TableCell align="left" className='p-1 text-white'>Learning material<i class="bi bi-filter-left"></i></TableCell>
                                                <TableCell align="left" className='p-1 text-white'>User</TableCell>
                                                <TableCell align="left" className='p-1 text-white'></TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow
                                                sx={{ 'td': { padding: 2 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Super Admin
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(superSyllabus && superSyllabus.permission)} {capitalizeFirstLetter(superSyllabus && superSyllabus.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(superTraining && superTraining.permission)} {capitalizeFirstLetter(superTraining && superTraining.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(superClass && superClass.permission)} {capitalizeFirstLetter(superClass && superClass.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(superMaterial && superMaterial.permission)} {capitalizeFirstLetter(superMaterial && superMaterial.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-star"></i> Full access
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                sx={{ 'td': { padding: 2 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Class Admin
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(classSyllabus && classSyllabus.permission)} {capitalizeFirstLetter(classSyllabus && classSyllabus.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(classTraining && classTraining.permission)} {capitalizeFirstLetter(classTraining && classTraining.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(classClass && classClass.permission)} {capitalizeFirstLetter(classClass && classClass.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(classMaterial && classMaterial.permission)} {capitalizeFirstLetter(classMaterial && classMaterial.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-plus-circle"></i> Create
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                sx={{ 'td': { padding: 2 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Trainer
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(trainerSyllabus && trainerSyllabus.permission)} {capitalizeFirstLetter(trainerSyllabus && trainerSyllabus.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(trainerTraining && trainerTraining.permission)} {capitalizeFirstLetter(trainerTraining && trainerTraining.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(trainerClass && trainerClass.permission)} {capitalizeFirstLetter(trainerClass && trainerClass.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(trainerMaterial && trainerMaterial.permission)} {capitalizeFirstLetter(trainerMaterial && trainerMaterial.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-eye"></i> View
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                sx={{ 'td': { padding: 2 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Student
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    {renderPermissionIcon(studentSyllabus && studentSyllabus.permission)} {capitalizeFirstLetter(studentSyllabus && studentSyllabus.permission)}
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-eye"></i> View
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-eye"></i> View
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-eye"></i> View
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-eye-slash"></i> Access denied
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </ Box>
                    </Container>
                </React.Fragment>


            </div>
            <Footer></Footer>
        </>
    )
}

export default UserPermissionView