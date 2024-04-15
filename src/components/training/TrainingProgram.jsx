import React from 'react';
import { useState, useEffect } from 'react';
import "./trainingProgram.css";
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';
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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useHistory, Route, Link } from 'react-router-dom';
import ImportProgram from '../import/ImportProgram';
import { getTrainingProgram, deleteTrainingProgram, deActiveTrainingProgram, duplicatedTrainingProgram, importTrainingProgram } from '../../services/TrainingProgramService';


const TrainingProgram = () => {

    //get list
    const [syllabusData, setSyllabusData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrainingProgram();
                console.log(data);
                setSyllabusData(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //notification
    const [openNo, setOpenNo] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleCloseNo = () => {
        setOpenNo(false);
    };

    //delete
    const [selectedItemId, setSelectedItemId] = useState(null);
    const handleDropdownItemDelete = (itemId) => {
        setSelectedItemId(itemId);
        deleteTrainingProgram(itemId);
        setNotificationMessage('Delete successful.');
        setOpenNo(true);
    };

    //de-active
    const handleDropdownItemDeActive = (itemId) => {
        setSelectedItemId(itemId);
        deActiveTrainingProgram(itemId);
        setNotificationMessage('De-active successful.');
        setOpenNo(true);
    };

    //duplicated
    const handleDropdownItemClickDuplicated = (itemId) => {
        setSelectedItemId(itemId);
        duplicatedTrainingProgram(itemId);
        setNotificationMessage('Duplicated successful.');
        setOpenNo(true);
    };

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;
    let totalPages = 0;

    if (syllabusData !== null) {
        totalPages = Math.ceil(syllabusData.length / itemsPerPage);
    }

    let currentData = [];
    if (syllabusData !== null) {
        currentData = syllabusData.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );
    }

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [importOpen, setImportOpen] = useState(false);

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className='p-0'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div>
                            <div>
                                <h5 className="training__program-header text-white w-100 p-2 m-0 border border-white">Training program</h5>
                            </div>
                            <div className="row p-1">
                                <div className="col-md-9 d-flex justify-content-start">
                                    <div>
                                        <div className="input-with-icon">
                                            <i class="bi bi-search"></i>
                                            <input type="text" className="search__by" placeholder='Search by ...' />
                                        </div>
                                    </div>
                                    <div>
                                        <button className='text-white p-1 border-0 rounded bg-core'><i class="bi bi-filter"></i>    <b>Filter</b></button>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-core"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                                </div>
                            </div>


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#47505f' }}>
                                        <TableRow>
                                            <TableCell className='p-1 text-white'>ID<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Program name<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Created on<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Created by<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Duration<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Status</TableCell>
                                            <TableCell align="left" className='p-1 text-white'></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentData.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left">
                                                    {item.id}
                                                </TableCell>
                                                <TableCell align="left">{item.name}</TableCell>
                                                <TableCell align="left">{item.createdDate.slice(0, 10)}</TableCell>
                                                <TableCell align="left">{item.createdBy}</TableCell>
                                                <TableCell align="left">{item.day} days</TableCell>
                                                <TableCell align="left"><p className='rounded p-1 w-75 text-center text-white bg-core'>{item.status}</p></TableCell>
                                                <TableCell align="right">
                                                    <div className="mb-2">
                                                        {['start'].map(
                                                            (direction) => (
                                                                <DropdownButton
                                                                    key={direction}
                                                                    id={`dropdown-button-drop-${direction}`}
                                                                    drop={direction}
                                                                    variant="light-subtle"
                                                                    title={<i className="bi bi-three-dots"></i>}
                                                                    toggle={false}
                                                                >
                                                                    <Dropdown.Item eventKey="1" >
                                                                        <i className="bi bi-plus-circle"></i>Training material
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="2" >
                                                                        <Link to={`/program/${item.id}`}>
                                                                            <i className="bi bi-eye"></i> View program
                                                                        </Link>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3"><i className="bi bi-pencil"></i> Edit program</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="4" onClick={() => handleDropdownItemClickDuplicated(item.id)}>
                                                                        <i className="bi bi-plus-circle"></i> Duplicate
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="5" onClick={() => handleDropdownItemDeActive(item.id)}>
                                                                        <i className="bi bi-plus-circle"></i> De-active program
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item eventKey="6" onClick={() => handleDropdownItemDelete(item.id)}><i className="bi bi-trash3"></i> Delete program</Dropdown.Item>
                                                                </DropdownButton>
                                                            ),
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                            <ImportProgram property={importOpen} />
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
                        </div>
                    </ Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default TrainingProgram