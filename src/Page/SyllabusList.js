import React from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import View from '../components/syllabus/View';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const SyllabusList = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0 overflow-y-scroll'>
                        <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                            <View />
                        </ Box>
                    </Container>
                </React.Fragment>
            </div>
            <Footer></Footer>
        </>
    )
}

export default SyllabusList