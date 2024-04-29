import { useEffect, useState } from 'react';
import * as React from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import Program from '../components/program/Program';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getByIdProgram } from '../services/TrainingProgramService';
import { useParams } from 'react-router-dom';

const ViewProgram = () => {

    const params = useParams();
    console.log("GET PARAMETER" + params.id)

    const [programData, setProgramData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByIdProgram(params.id);
                setProgramData([data]);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>

                <React.Fragment>
                    <CssBaseline />
                    <Container fixed className='p-0 overflow-y-scroll'>
                        <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                            <div>
                                <Program programData={programData} />
                            </div>
                        </ Box>
                    </Container>
                </React.Fragment>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ViewProgram