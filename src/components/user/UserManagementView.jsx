import React from 'react';
import { useState } from 'react';
import ActionMenu from '../action/ActionMenu';
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';
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

const UserManagementView = () => {


    const getClassForStatus = (status) => {
        switch (status) {
            case 'On Boaring':
                return 'organ-bg';
            case 'In class':
                return 'gray-bg';
            case 'Active':
                return 'gray-bg';
            case 'Off class':
                return 'grayy-bg';
            default:
                return '';
        }
    };

    const getClassForType = (type) => {
        switch (type) {
            case 'Admin':
                return 'green-bg';
            default:
                return 'gray-bg';
        }
    };

    const getClassForGender = (sex) => {
        switch (sex) {
            case 'Female':
                return 'redicon-bg';
            default:
                return 'blueicon-bg';
        }
    };

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(Data.length / itemsPerPage);

    const currentData = Data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

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
                                <h5 className="training__program-header text-white">Training program</h5>
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
                                        <button className='text-white p-1 border-0 rounded bg-primary'><i class="bi bi-filter"></i>    <b>Filter</b></button>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button className="border border-0 text-white rounded me-3 px-2 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    <button className="border border-0 text-white rounded me-3 px-2 py-1"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                                </div>
                            </div>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#47505f' }}>
                                        <TableRow>
                                            <TableCell className='p-1 text-white'>ID<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Fullname<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Email<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Date of birth<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Gender<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Level</TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Type</TableCell>
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
                                                <TableCell align="left">{item.email}</TableCell>
                                                <TableCell align="left">{item.birth}</TableCell>
                                                <TableCell align="left"><i class={`bi bi-person-fill ${getClassForGender(item.sex)}`}></i></TableCell>
                                                <TableCell align="left">{item.level}</TableCell>
                                                <TableCell align="left"><p className={`syllabus_p ${getClassForType(item.type)}`}>{item.type}</p></TableCell>
                                                <TableCell align="left"><p className={`syllabus_p ${getClassForStatus(item.status)}`}>{item.status}</p></TableCell>
                                                <TableCell align="right"><ActionMenu></ActionMenu></TableCell>
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
                        </div>
                    </ Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default UserManagementView

const Data = [
    {
        "id": "1",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Male",
        level: "AC",
        type: "Student",
        status: "In class"
    },
    {
        id: "2",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Female",
        level: "AC",
        type: "Trainer",
        status: "In class"
    },
    {
        "id": "3",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Male",
        level: "AC",
        type: "Student",
        status: "On Boaring"
    },
    {
        id: "4",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Male",
        level: "AC",
        type: "Admin",
        status: "Active"
    },
    {
        id: "5",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Female",
        level: "AC",
        type: "Student",
        status: "Off class"
    },
    {
        id: "6",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Male",
        level: "AC",
        type: "Trainer",
        status: "On Boaring"
    },
    {
        id: "7",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Male",
        level: "AC",
        type: "Trainer",
        status: "On Boaring"
    },
    {
        id: "8",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Male",
        level: "AC",
        type: "Trainer",
        status: "On Boaring"
    },
    {
        id: "9",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Female",
        level: "AC",
        type: "Trainer",
        status: "In class"
    },
    {
        id: "10",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Female",
        level: "AC",
        type: "Trainer",
        status: "In class"
    },
    {
        id: "11",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Female",
        level: "AC",
        type: "Trainer",
        status: "In class"
    },
    {
        id: "12",
        name: "Lê Tiến Việt",
        birth: "22/04/2021",
        email: "tienviet@gmail.com",
        sex: "Female",
        level: "AC",
        type: "Trainer",
        status: "In class"
    },
]