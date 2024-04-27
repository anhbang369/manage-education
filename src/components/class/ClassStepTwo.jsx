import React from 'react';
import { useEffect, useState } from 'react';
import "./classStepTwo.css";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';
import { getTrainingProgramAdd } from "../../services/TrainingProgramService";

const ClassStepTwo = ({ classDto, onNextStep }) => {

    //get list
    const [programData, setProgramData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [programTwo, setProgramTwo] = useState([]);

    useEffect(() => {
        if (classDto) {
            setProgramTwo([classDto]);
        }
    }, [classDto]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrainingProgramAdd();
                console.log("First data: ", data);
                setProgramData(data);
                setIsDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProgram = isDataLoaded ? programData.filter((syllabus) =>
        syllabus.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    const handleItemClick = (program) => {
        const foundIndex = selectedItems.findIndex(item => item.id === program.id);

        if (foundIndex === -1) {
            setSelectedItems([program]);
        } else {
            setSelectedItems(prevItems => [
                ...prevItems.slice(0, foundIndex),
                program,
                ...prevItems.slice(foundIndex + 1)
            ]);
        }
    };


    console.log('this is: ' + JSON.stringify(selectedItems));

    const handleNextButtonClick = () => {
        onNextStep(classDto, selectedItems);
    };

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
                                        <div className='col-md-4'><h4 className='border-bottom border-white'>{classDto.name}</h4></div>
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
                                    <input type="text" className="search__by" placeholder='Search by ...' value={searchTerm}
                                        onChange={handleSearchChange} />
                                </div>
                            </div>
                            {filteredProgram.length > 0 && searchTerm && (
                                <div className='box-shadow-1 rounded w-30 ms-4 pointer' style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {filteredProgram.map((program, index) => (
                                        !selectedItems.some(selectedItem => selectedItem.id === program.id) && (
                                            <div
                                                className='fs-14 fw-bold ps-3 hover pb-2 pt-1'
                                                key={index}
                                                onClick={() => handleItemClick(program)}
                                            >
                                                {program.name} {program.code}
                                                <div className='row'>
                                                    <div className="col-md-3 fs-14 fw-normal">{program.hours} hours</div>
                                                    <div className="col-md-9 fs-14 fw-normal">{program.createdDate.slice(0, 10)} by <b>{program.createdBy.slice(0, 10)}...</b></div>
                                                </div>
                                            </div>
                                        )
                                    ))}

                                </div>
                            )}
                            {selectedItems.map((item, index) => (
                                <div className='class__view-syllabus row'>
                                    <div className='col-md-3 p-2 row bg-core rounded-start'>

                                    </div>
                                    <div className='col-md-9 row box-shadow-1 rounded-end p-2'>
                                        <div className='col-md-12 d-flex'>
                                            <h5><b>{item.name}</b></h5>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='d-flex'>
                                                <p className='fw-normal'>{item.version}</p>
                                                <p className='fw-normal px-2'>|</p>
                                                <p className='fw-normal'>{item.days} days ({item.hours} hours)</p>
                                                <p className='fw-normal px-2'>|</p>
                                                <p className='fw-normal'>{item.createdDate.slice(0, 10)} by <b>{item.createdBy}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}


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
                                        <button className="bg-secondary border-0 text-white rounded p-2 my-4" onClick={handleNextButtonClick}>Next</button>
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