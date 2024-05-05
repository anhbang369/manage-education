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
import { getTrainingProgram, deleteTrainingProgram, deActiveTrainingProgram, duplicatedTrainingProgram } from '../../services/TrainingProgramService';


const TrainingProgram = () => {

    //get list
    const [syllabusData, setSyllabusData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [syllabusSearch, setSyllabusSearch] = useState(null);

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

    //search
    //search
    const handleSearch = () => {

        if (searchHistory.length <= 0 && searchDate !== null) {
            if (syllabusData !== null) {
                const filteredData = syllabusData.filter(item => {
                    const dateMatch = item.createdDate.includes(searchDate);
                    return (searchDate === '' || dateMatch);
                });
                setSyllabusSearch(filteredData)
            }
        } else {
            if (syllabusData !== null) {
                const filteredData = syllabusData.filter(item => {
                    let isMatch = false;

                    const relationCount = searchHistory.reduce((count, searchItem) => {
                        const searchTextLowerCase = searchItem.searchText.toLowerCase();
                        const nameMatch = item.name && item.name.toLowerCase().includes(searchTextLowerCase);
                        const byMatch = item.createdBy && item.createdBy.toLowerCase().includes(searchTextLowerCase);
                        return count + (nameMatch ? 1 : 0) + (byMatch ? 1 : 0);
                    }, 0);

                    const isRelationMatch = relationCount === searchHistory.length;
                    const isDateMatch = (searchDate && searchDate.trim() !== '') ? item.createdDate.slice(0, 10).includes(searchDate) : true;

                    if (isRelationMatch && isDateMatch) {
                        isMatch = true;
                    }

                    return isMatch;
                });
                setSyllabusSearch(filteredData)
            }
        }

    };

    useEffect(() => {
        handleSearch();
    }, [searchHistory, searchDate]);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            const newSearchItem = { searchText };
            setSearchHistory(prevSearchHistory => [...prevSearchHistory, newSearchItem]);
            setSearchText('');
        }
    };

    //delete history
    const handleRemoveSearchItem = (index) => {
        setSearchHistory(prevSearchHistory => {
            const newSearchHistory = [...prevSearchHistory];
            newSearchHistory.splice(index, 1);
            return newSearchHistory;
        });

    };

    //notification
    const [openNo, setOpenNo] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleCloseNo = () => {
        setOpenNo(false);
    };

    //delete
    const [selectedItemId, setSelectedItemId] = useState(null);
    const handleDropdownItemDelete = (itemId) => {
        setSelectedItemId(itemId);
        const status = deleteTrainingProgram(itemId);
        if (status === 200) {
            setNotificationMessage('Delete successful.');
            setSeverity('success');

        }
        if (status === 403 || status === 401) {
            setNotificationMessage('You do not have permission to perform this action.');
            setSeverity('warning');

        }
        if (status === 500 || status === 400) {
            setNotificationMessage('Error delete program.');
            setSeverity('error');

        }
        setOpenNo(true);
    };

    //de-active
    const handleDropdownItemDeActive = (itemId) => {
        setSelectedItemId(itemId);
        const status = deActiveTrainingProgram(itemId);
        if (status === 200) {
            setNotificationMessage('De-active successful.');
            setSeverity('success');

        }
        if (status === 403 || status === 401) {
            setNotificationMessage('You do not have permission to perform this action.');
            setSeverity('warning');

        }
        if (status === 500 || status === 400) {
            setNotificationMessage('Error de-active program.');
            setSeverity('error');

        }
        setOpenNo(true);
    };

    //duplicated
    const handleDropdownItemClickDuplicated = (itemId) => {
        setSelectedItemId(itemId);
        const status = duplicatedTrainingProgram(itemId);
        if (status === 200) {
            setNotificationMessage('Duplicated successful.');
            setSeverity('success');

        }
        if (status === 403 || status === 401) {
            setNotificationMessage('You do not have permission to perform this action.');
            setSeverity('warning');

        }
        if (status === 500 || status === 400) {
            setNotificationMessage('Error duplicated program.');
            setSeverity('error');

        }
        setOpenNo(true);
    };

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 8;
    let totalPages = 0;
    let currentData = [];

    if (!searchHistory.length && !searchDate) {
        if (syllabusData !== null) {
            totalPages = Math.ceil(syllabusData.length / itemsPerPage);
            currentData = syllabusData.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
            );
        }
    } else {
        if (syllabusSearch !== null) {
            totalPages = Math.ceil(syllabusSearch.length / itemsPerPage);
            currentData = syllabusSearch.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
            );
        }
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
                                <div className="syllabus__search col-md-8">
                                    <div className="input-with-icon">
                                        <i className="bi bi-search"></i>
                                        <input type="text" className="search__by" placeholder='Search by ...' value={searchText}
                                            onChange={handleSearchTextChange}
                                            onKeyPress={handleEnterPress} />
                                    </div>
                                    <div className="input-with-icon">
                                        <i className="bi bi-calendar"></i>
                                        <input type="text" className="search__date" placeholder='Created date' value={searchDate}
                                            onChange={handleSearchDateChange} />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-core"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                                </div>
                            </div>
                            <div className="mt-2 ms-10 d-flex">
                                {searchHistory && searchHistory.map((searchData, index) => (
                                    <p key={index} className="bg-dark text-white rounded ms-4 mb-3 p-1 text-center">{searchData.searchText} <i className="bi bi-x-lg pointer" onClick={() => handleRemoveSearchItem(index)}></i></p>
                                ))}
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
                                    severity={severity}
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