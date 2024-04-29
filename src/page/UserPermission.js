import React from 'react';
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

const UserPermission = () => {
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
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
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
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
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
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
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
                                                    <Form.Select aria-label="Default select example">
                                                        <option>Permission</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
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
                            </div>
                        </ Box>
                    </Container>
                </React.Fragment>


            </div>
            <Footer></Footer>
        </>
    )
}

export default UserPermission