import { useState, useEffect } from 'react';
import React from 'react';
import "./view.css";
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Paper from '@mui/material/Paper';
import { getSyllabusData, duplicatedSyllabus, deleteSyllabus } from '../../services/SyllabusService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';


const View = () => {

    //get list
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const [syllabusData, setSyllabusData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSyllabusData();
                console.log("this is dada: " + data);
                setSyllabusData(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    console.log("this is syllabus data: " + syllabusData);

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

    //notification
    const [openNo, setOpenNo] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleCloseNo = () => {
        setOpenNo(false);
    };

    //duplicated
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleDropdownItemClick = (itemId) => {
        setSelectedItemId(itemId);
        duplicatedSyllabus(itemId);
        setNotificationMessage('Import successful.');
        setOpenNo(true);
    };


    //delete
    const handleDropdownItemDelete = (itemId) => {
        setSelectedItemId(itemId);
        deleteSyllabus(itemId);
        setNotificationMessage('Delete successful.');
        setOpenNo(true);
    };

    //search
    console.log('date: ' + searchDate)
    const handleSearch = () => {
        if (syllabusData !== null) {
            const filteredData = syllabusData.filter(item => {
                let isMatch = false;
                searchHistory.forEach(searchItem => {
                    if (searchItem.searchText) {
                        const searchTextLowerCase = searchItem.searchText.toLowerCase();
                        const nameMatch = item.name.toLowerCase().includes(searchTextLowerCase);
                        const codeMatch = item.code.toLowerCase().includes(searchTextLowerCase);
                        const byMatch = item.createBy.toLowerCase().includes(searchTextLowerCase);

                        if ((nameMatch || codeMatch || byMatch)) {
                            isMatch = true;
                        }
                    }
                });

                const dateMatch = (searchDate && searchDate.trim() !== '') ? item.createOn.slice(0, 10).includes(searchDate) : true;

                return isMatch && dateMatch;
            });

            let filteredByRelationCount = filteredData;

            if (searchHistory.length > 0) {
                filteredByRelationCount = filteredData.filter(item => {
                    const relationCount = searchHistory.reduce((count, searchItem) => {
                        const searchTextLowerCase = searchItem.searchText.toLowerCase();
                        const nameMatch = item.name.toLowerCase().includes(searchTextLowerCase);
                        const codeMatch = item.code.toLowerCase().includes(searchTextLowerCase);
                        const byMatch = item.createBy.toLowerCase().includes(searchTextLowerCase);
                        const dateMatch = (searchDate && searchDate.trim() !== '') ? item.createOn.includes(searchDate) : true;
                        return count + (nameMatch ? 1 : 0) + (codeMatch ? 1 : 0) + (byMatch ? 1 : 0) + (dateMatch ? 1 : 0); // Tính cả trường createOn
                    }, 0);
                    return relationCount === searchHistory.length;
                });
            }

            setCurrentPage(0);

            console.log('after getdata: ' + JSON.stringify(filteredByRelationCount));
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

    console.log('list search: ' + JSON.stringify(searchHistory))

    //delete history
    const handleRemoveSearchItem = (index) => {
        setSearchHistory(prevSearchHistory => {
            const newSearchHistory = [...prevSearchHistory];
            newSearchHistory.splice(index, 1);
            return newSearchHistory;
        });

    };





    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className='p-0'>
                <Box sx={{ bgcolor: '#FFF', height: '100%', width: '100%' }}>
                    <div className='syllabus__container'>
                        <h5 className="mb-2 bg-core text-white border border-white p-2">Syllabus</h5>
                        <div className="row">
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


                            <div className="col-md-4">
                                <button className="border border-0 text-white rounded me-3 px-2 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                <button className="border border-0 text-white rounded me-3 px-2 py-1 bg-core"><i class="bi bi-plus-circle"></i> Add syllabus</button>
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
                                        <TableCell className='p-1 text-white'>Syllabus<i class="bi bi-filter-left"></i></TableCell>
                                        <TableCell align="left" className='p-1 text-white'>Code<i class="bi bi-filter-left"></i></TableCell>
                                        <TableCell align="left" className='p-1 text-white'>Created on<i class="bi bi-filter-left"></i></TableCell>
                                        <TableCell align="left" className='p-1 text-white'>Created by<i class="bi bi-filter-left"></i></TableCell>
                                        <TableCell align="left" className='p-1 text-white'>Duration<i class="bi bi-filter-left"></i></TableCell>
                                        <TableCell align="left" className='p-1 text-white'>Output standard</TableCell>
                                        <TableCell align="left" className='p-1 text-white'></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentData && currentData.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ 'td': { padding: 0 } }}
                                        >
                                            <TableCell align="left">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="left">{item.code}</TableCell>
                                            <TableCell align="left">{item.createOn.slice(0, 10)}</TableCell>
                                            <TableCell align="left">{item.createBy}</TableCell>
                                            <TableCell align="left">{item.duration} hours</TableCell>
                                            <TableCell align="left" className='d-flex'>
                                                {item.outputStandard.map((output, index) => (
                                                    <div key={index} className="syllabus__standard text-white rounded-pill mx-8 my-0 d-flex justify-content-center align-items-center p-2">{output.code}</div>
                                                ))}
                                            </TableCell>
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
                                                                <Dropdown.Item eventKey="1" onClick={() => handleDropdownItemClick(item.id)}>
                                                                    <i className="bi bi-plus-circle"></i>Add training program
                                                                </Dropdown.Item>
                                                                <Dropdown.Item eventKey="2"><i className="bi bi-pencil"></i> Edit syllabus</Dropdown.Item>
                                                                <Dropdown.Item eventKey="3" onClick={() => handleDropdownItemClick(item.id)}>
                                                                    <i className="bi bi-plus-circle"></i> Duplicate
                                                                </Dropdown.Item>
                                                                <Dropdown.Item eventKey="4">
                                                                    <Link to={`/view/${item.id}`}>
                                                                        <i className="bi bi-eye"></i> View syllabus
                                                                    </Link>
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


    )
}

export default View