import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getSyllabusProgram } from "../../services/SyllabusService";

const TrainingProgramStepTwo = ({ classDto }) => {

    //get list
    const [syllabusData, setSyllabusData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSyllabusProgram();
                console.log("First data: ", data);
                setSyllabusData(data);
                setIsDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    console.log("this is data for filter: ", syllabusData);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSyllabus = isDataLoaded ? syllabusData.filter((syllabus) =>
        syllabus.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    const handleItemClick = (item) => {
        const isExist = selectedItems.some(selectedItem => selectedItem.id === item.id);
        if (!isExist) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    console.log([selectedItems])

    const handleDeleteItem = (idToDelete) => {
        const newData = selectedItems.filter(item => item.id !== idToDelete);
        setSelectedItems(newData);
    };


    return (
        <>
            <div >
                <div className="bg-core text-white border border-white">
                    <h6 className="p-1 ms-3">Training program</h6>
                    <div className='d-flex'>
                        <h5 className="p-1 ms-3">{classDto.classNameP}</h5>
                        <p className="p-1 text-white rounded border-0 bg-secondary text-center h-50 ms-3">Inactive</p>
                    </div>
                </div>
                <p className='ms-3 mt-2 fs-14 fw-normal'>...days (...hours)</p>
                <p className='ms-3 mt-2 fs-14 fw-normal'>Modified on 21/07/2023 by <b>Anh Bang</b></p>
                <div className='border-bottom border-black'></div>
                <h6 className='ms-3 mt-2 mb-0'>Content</h6>

                {selectedItems.map((item, index) => (
                    // <div className='d-flex'>
                    //     <div className='content__syllabus w-75' key={index}>
                    //         <div className='content__component d-flex'>
                    //             <div className='fs-16 p-2'><b>{item.title}</b></div>
                    //             <div className='bg-core rounded text-white w-5 h-20p text-center mt-2'><p>{item.status}</p></div>
                    //         </div>
                    //         <div className='d-flex p-2'>
                    //             <p className='fs-14 fw-normal me-2'>{item.programName}</p>
                    //             <p className='fs-14 fw-normal me-2'>|</p>
                    //             <p className='fs-14 fw-normal me-2'>{item.duration}</p>
                    //             <p className='fs-14 fw-normal me-2'>|</p>
                    //             <p className='fs-14 fw-normal me-2'>Modified on {item.modifiedDate} by {item.modifiedBy}</p>
                    //         </div>
                    //     </div>
                    //     <div className='ms-2 mt-3 d-flex py-3 px-1 bg-delete rounded'>
                    //         <i class="bi bi-trash justify-content-center align-items-center align-self-start mt-2 text-white"></i>
                    //     </div>
                    // </div>
                    <div className='d-flex'>
                        <div className='content__syllabus w-75' key={index}>
                            <div className='content__component d-flex'>
                                <div className='fs-16 p-2'><b>{item.name}</b></div>
                                <div className='bg-core rounded text-white w-5 h-20p text-center mt-2'><p>{item.status}</p></div>
                            </div>
                            <div className='d-flex p-2'>
                                <p className='fs-14 fw-normal me-2'>{item.code} {item.version}</p>
                                <p className='fs-14 fw-normal me-2'>|</p>
                                <p className='fs-14 fw-normal me-2'>{item.days} days ({item.hours} hours)</p>
                                <p className='fs-14 fw-normal me-2'>|</p>
                                <p className='fs-14 fw-normal me-2'>Modified on {item.createdDate.slice(0, 10)} by {item.createdBy}</p>
                            </div>
                        </div>
                        <div className='ms-2 mt-3 d-flex py-3 px-1 bg-delete rounded' onClick={() => handleDeleteItem(item.id)}>
                            <i class="bi bi-trash justify-content-center align-items-center align-self-start mt-2 text-white"></i>
                        </div>
                    </div>

                ))}


                <div>
                    <label className='ms-3 mt-4' htmlFor=""><b>Select syllabus</b></label>
                    <div className="input-with-icon">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            className="search__by"
                            placeholder='Search by ...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>


                    <div className='d-flex'>
                        <label className='ms-3 mt-4 text-white' htmlFor=""><b>Select syllabus</b></label>
                        {filteredSyllabus.length > 0 && searchTerm && (
                            <div className='box-shadow-1 rounded w-30 ms-4 pointer' style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {filteredSyllabus.map((syllabus, index) => (
                                    !selectedItems.some(selectedItem => selectedItem.id === syllabus.id) && (
                                        <div
                                            className='fs-14 fw-bold ms-3'
                                            key={index}
                                            onClick={() => handleItemClick(syllabus)}
                                        >
                                            {syllabus.name} {syllabus.code}
                                            <div className='row'>
                                                <div className="col-md-3 fs-14 fw-normal">{syllabus.hours} hours</div>
                                                <div className="col-md-9 fs-14 fw-normal">{syllabus.createdDate.slice(0, 10)} by <b>{syllabus.createdBy.slice(0, 10)}</b></div>
                                            </div>
                                        </div>
                                    )
                                ))}

                            </div>
                        )}

                    </div>

                </div>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <button className="bg-secondary border-0 text-white rounded p-2 my-4 ms-3">Back</button>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={1}>
                            <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                        </Grid>
                        <Grid item xs={1}>
                            <button className="bg-secondary border-0 text-white rounded p-2 my-4">Save</button>
                        </Grid>
                    </Grid>
                </Box>
            </div >
        </>
    )
}

export default TrainingProgramStepTwo

const Data = [
    {
        id: 1,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep"
    },
    {
        id: 2,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep"
    },
    {
        id: 3,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep"
    }
]