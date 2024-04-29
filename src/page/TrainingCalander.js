import React from 'react';
import Demo from '../components/calendar/demo';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


const TrainingCalander = () => {
    return (
        <>
            <>
                <Navbar></Navbar>
                <div className='main'>
                    <Sidebar></Sidebar>
                    <React.Fragment>
                        <CssBaseline />
                        <Container fixed className='p-0 overflow-y-scroll'>
                            <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                                <h5 className='training__calendar-title'>Training Calendar</h5>
                                <Demo />
                            </ Box>
                        </Container>
                    </React.Fragment>


                </div>
                <Footer></Footer>
            </>
        </>
    )
}

export default TrainingCalander