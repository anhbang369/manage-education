import React from 'react';
import { useState, useEffect } from 'react';
import ActionMenu from '../action/ActionMenu';
import ReactPaginate from 'react-paginate';
import ImportUser from '../import/ImportUser';
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
import { getUserData } from '../../services/UserService';

const UserManagementView = () => {

    //get list
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData();
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);


    const getClassForStatus = (status) => {
        switch (status) {
            case 'On Boaring':
                return 'organ-bg';
            case 'In class':
                return 'gray-bg';
            case 'ACTIVE':
                return 'gray-bg';
            case 'Off class':
                return 'grayy-bg';
            default:
                return '';
        }
    };

    const getClassForType = (type) => {
        switch (type) {
            case 'ADMIN':
                return 'green-bg';
            default:
                return 'gray-bg';
        }
    };

    const getClassForGender = (sex) => {
        switch (sex) {
            case 'FEMALE':
                return 'redicon-bg';
            default:
                return 'blueicon-bg';
        }
    };

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 8;
    let totalPages = 0;

    if (userData !== null) {
        totalPages = Math.ceil(userData.length / itemsPerPage);
    }

    let currentData = [];
    if (userData !== null) {
        currentData = userData.slice(
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
                                <h5 className="training__program-header text-white border border-white">User Management</h5>
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
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-core"><i class="bi bi-plus-circle"></i> Add new</button>
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
                                                <TableCell align="left">{item.fullName}</TableCell>
                                                <TableCell align="left">{item.email}</TableCell>
                                                <TableCell align="left">{item.birthday}</TableCell>
                                                <TableCell align="left"><i class={`bi bi-person-fill ${getClassForGender(item.gender)}`}></i></TableCell>
                                                <TableCell align="left">{item.level}</TableCell>
                                                <TableCell align="left"><p className={`syllabus_p mt-1 ${getClassForType(item.role.name)}`}>{item.role.name}</p></TableCell>
                                                <TableCell align="left"><p className={`syllabus_p mt-1 ${getClassForStatus(item.status)}`}>{item.status}</p></TableCell>
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
                            <ImportUser property={importOpen} />
                        </div>
                    </ Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default UserManagementView