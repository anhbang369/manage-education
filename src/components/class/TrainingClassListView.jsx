import React from 'react';
import { useState, useEffect } from 'react';
import "./trainingClassList.css";
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';
import ActionMenu from '../action/ActionMenu';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getTrainingProgram, deleteTrainingClass, duplicatedTrainingClass } from '../../services/TrainingClassService';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const TrainingClassListView = () => {

    const getClassForFsu = (fsu) => {
        switch (fsu) {
            case 'FRF':
                return 'blue-bg';
            case 'CPLU':
                return 'green-bg';
            case 'PFR':
                return 'gray-bg';
            case 'CPL':
                return 'organ-bg';
            default:
                return 'organ-bg';
        }
    };

    //notification
    const [openNo, setOpenNo] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleCloseNo = () => {
        setOpenNo(false);
    };


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

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 8;
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

    //delete
    const [selectedItemId, setSelectedItemId] = useState(null);
    const handleDropdownItemDelete = (itemId) => {
        setSelectedItemId(itemId);
        deleteTrainingClass(itemId);
        setNotificationMessage('Delete successful.');
        setOpenNo(true);
    };

    //duplicated
    const handleDropdownItemDuplicated = (itemId) => {
        setSelectedItemId(itemId);
        duplicatedTrainingClass(itemId);
        setNotificationMessage('Import successful.');
        setOpenNo(true);
    };

    return (
        <>

            <React.Fragment>
                <CssBaseline />
                <Container fixed className='p-0'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div>
                            <h5 className='syllabus__training-class-header'>Traning Class</h5>
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
                                    <button className="border border-0 text-white rounded me-3 px-2 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    <button className="border border-0 text-white rounded me-3 px-2 py-1 bg-core"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                                </div>
                            </div>
                            <div className="mt-2 ms-10 d-flex">
                                <p className="bg-dark text-white rounded ms-4 mb-3 p-1 d-flex w-10">foundation <i class="bi bi-x-lg"></i></p>
                                <p className="bg-dark text-white rounded ms-3 mb-3 p-1 d-flex w-10">HaNTT <i class="bi bi-x-lg"></i></p>
                            </div>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#47505f' }}>
                                        <TableRow>
                                            <TableCell className='p-1 text-white'>Class<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Class Code<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Created on<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Created by<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Duration<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Attendee<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Location<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>FSU<i class="bi bi-filter-left"></i></TableCell>
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
                                                    {item.name}
                                                </TableCell>
                                                <TableCell align="left">{item.code}</TableCell>
                                                <TableCell align="left">{item.createdDate.slice(0, 10)}</TableCell>
                                                <TableCell align="left">{item.createdBy}</TableCell>
                                                <TableCell align="left">{item.duration}</TableCell>
                                                <TableCell align="left"><p className={`syllabus_p ${getClassForFsu(item.attend)}`}>{item.attend}</p></TableCell>
                                                <TableCell align="left">{item.location}</TableCell>
                                                <TableCell align="left">{item.fsu}</TableCell>
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
                                                                        <i className="bi bi-plus-circle"></i>View
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="2"><i className="bi bi-pencil"></i> Edit syllabus</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3" onClick={() => handleDropdownItemDuplicated(item.id)}>
                                                                        <i className="bi bi-plus-circle"></i> Duplicated class
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="4">
                                                                        {/* <Link to={`/view/${item.id}`}>
                                                                        <i className="bi bi-eye"></i> View syllabus
                                                                    </Link> */}
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item eventKey="5" onClick={() => handleDropdownItemDelete(item.id)}><i className="bi bi-trash3"></i> Delete syllabus</Dropdown.Item>
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

                            <Import property={importOpen} />
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

export default TrainingClassListView