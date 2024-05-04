import React from 'react';
import { useState, useEffect } from 'react';
import "./userPermission.css";
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import Form from 'react-bootstrap/Form';
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
import { getMaterialAuthorities, getSyllabusAuthorities, getTrainingAuthorities, getClassAuthorities, getRoleAuthorities } from '../services/AuthoritiesService';
import { getRolePermission, updateRolePermission } from "../services/RoleService";

const UserPermissionView = () => {
    const [material, setMaterial] = useState(null);
    const [syllabus, setSyllabus] = useState(null);
    const [training, setTraining] = useState(null);
    const [classA, setCLassA] = useState(null);
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
                const data = await getMaterialAuthorities();
                setMaterial(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSyllabusAuthorities();
                setSyllabus(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrainingAuthorities();
                setTraining(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClassAuthorities();
                setCLassA(data);
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
        str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        return str.replace(/_/g, ' ');
    };

    //update dto
    const handlePermissionChange = (roleID, oldAuthorityID, newAuthorityID) => {
        const newRole = role.map(roleItem => {
            if (roleItem.roleId === roleID) {
                roleItem.authoritiesId = roleItem.authoritiesId.map(authorityId => {
                    return authorityId === oldAuthorityID ? newAuthorityID : authorityId;
                });
            }
            return roleItem;
        });
        setRole(newRole);
    };
    console.log('update role: ' + JSON.stringify(role))

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
                                <div className='d-flex justify-content-end'><button className='p-1 rounded text-white border border-white mb-3 bg-core'><i class="bi bi-plus-circle"></i> Add new</button></div>

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
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Super Admin
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('4436720a-4def-11ed-bdc3-0242ac120002', superSyllabus.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {syllabus && syllabus.map((sl, idx) => (
                                                            <option key={sl.id} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('4436720a-4def-11ed-bdc3-0242ac120002', superTraining.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {training && training.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('4436720a-4def-11ed-bdc3-0242ac120002', superClass.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {classA && classA.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('4436720a-4def-11ed-bdc3-0242ac120002', superMaterial.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {material && material.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-star"></i> Full access
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Class Admin
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9f64df36-4def-11ed-bdc3-0242ac120002', classSyllabus.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {syllabus && syllabus.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9f64df36-4def-11ed-bdc3-0242ac120002', classTraining.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {training && training.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9f64df36-4def-11ed-bdc3-0242ac120002', classClass.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {classA && classA.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9f64df36-4def-11ed-bdc3-0242ac120002', classMaterial.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {material && material.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-plus-circle"></i> Create
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Trainer
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9821f52e-4def-11ed-bdc3-0242ac120002', trainerSyllabus.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {syllabus && syllabus.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9821f52e-4def-11ed-bdc3-0242ac120002', trainerTraining.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {training && training.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9821f52e-4def-11ed-bdc3-0242ac120002', trainerClass.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {classA && classA.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('9821f52e-4def-11ed-bdc3-0242ac120002', trainerMaterial.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {material && material.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left" className='text-primary'>
                                                    <i class="bi bi-eye"></i> View
                                                </TableCell>
                                            </TableRow>
                                            <TableRow
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left" className='fw-bold'>
                                                    Student
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example" onChange={(e) => handlePermissionChange('b424387c-4def-11ed-bdc3-0242ac120002', studentSyllabus.id, e.target.value)}>
                                                        <option>Permission</option>
                                                        {syllabus && syllabus.map((sl, idx) => (
                                                            <option key={idx} value={sl.id}>{capitalizeFirstLetter(sl.permission)}</option>
                                                        ))}
                                                    </Form.Select>
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

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                        </Grid>
                                        <Grid item xs={1}>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Cancel</button>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <button className="bg-secondary border-0 text-white rounded p-2 my-4" onClick={() => handleButtonClick()}>Save</button>
                                        </Grid>
                                    </Grid>
                                    <Snackbar open={openNo} autoHideDuration={6000} onClose={handleCloseNo}>
                                        <Alert
                                            onClose={handleCloseNo}
                                            severity="success"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            {notificationMessage}
                                        </Alert>
                                    </Snackbar>
                                </Box>
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