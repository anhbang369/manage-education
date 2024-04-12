import React from 'react';
import "./classStepTwo.css";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';

const ClassStepTwo = ({ classDto }) => {
    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className='p-0 overflow-y-scroll'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div>
                            <div className='row bg-core text-white border border-white'>
                                <h6>Class</h6>
                                <div className='row'>
                                    <div className='col-md-11 row'>
                                        <div className='col-md-4'><h4 className='border-bottom border-white'>{classDto.className}</h4></div>
                                        <div className='col-md-8'><p className='border border-white rounded bg-chapter w-10 text-center'>Plaining</p></div>
                                    </div>
                                    <div className='col-md-1'>
                                        <i class="bi bi-three-dots"></i>
                                    </div>
                                </div>

                                <div className='d-flex'>
                                    <div>
                                        <p className='fw-normal'> days ( hours)</p>
                                    </div>
                                    <div>
                                        <p className='fw-normal'>|</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-3 text-white'>
                                <div className='col-md-4'>
                                    <h6 className='bg-general p-1 rounded fs-14'><i class="bi bi-calendar"></i> General</h6>
                                    <h6 className='bg-general p-1 rounded fs-14' ><i class="bi bi-star"></i> Attendee</h6>
                                </div>
                                <div className='col-md-1'>
                                </div>
                                <div className='col-md-7 '>
                                    <div className='bg-general d-flex p-1 rounded'>
                                        <p><i class="bi bi-calendar"></i> Time frame</p>
                                        <p className='ms-3'>25-Apr-22 to 21-July-22</p>
                                    </div>
                                </div>
                            </div>

                            <h6 className='mt-3 ms-3 fs-14 bg-core rounded-top w-15 text-center text-white p-1 m-0'>Training program</h6>
                            <div className='p-3 bg-core ms-3 border border-white rounded-top-end'>
                                <p className='fw-normal ms-3 py-1 px-0 fs-14 text-white'>Training program name</p>
                                <div className="input-with-icon">
                                    <i class="bi bi-search"></i>
                                    <input type="text" className="search__by" placeholder='Search by ...' />
                                </div>
                            </div>

                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Save as draft</button>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <button className="bg-secondary border-0 text-white rounded p-2 my-4">Next</button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </ Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default ClassStepTwo