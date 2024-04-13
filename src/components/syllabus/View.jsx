import { useState, useEffect } from 'react';
import React from 'react';
import "./view.css";
import Data from './Data';
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
import Paper from '@mui/material/Paper';
import { getSyllabusData } from '../../services/SyllabusService';


const View = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 8;

    const totalPages = Math.ceil(Data.length / itemsPerPage);

    const currentData = Data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [importOpen, setImportOpen] = useState(false);


    //get list
    const [syllabusData, setSyllabusData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSyllabusData();
                console.log(data);
                setSyllabusData(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);



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
                                    <i class="bi bi-search"></i>
                                    <input type="text" className="search__by" placeholder='Search by ...' />
                                </div>
                                <div className="input-with-icon">
                                    <i class="bi bi-calendar"></i>
                                    <input type="text" className="search__date" placeholder='Created date' />
                                </div>
                            </div>

                            <div className="col-md-4">
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
                                    {syllabusData && syllabusData.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ 'td': { padding: 0 } }}
                                        >
                                            <TableCell align="left">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="left">{item.code}</TableCell>
                                            <TableCell align="left">{item.createOn}</TableCell>
                                            <TableCell align="left">{item.createBy}</TableCell>
                                            <TableCell align="left">{item.duration} hours</TableCell>
                                            <TableCell align="left" className='d-flex'>
                                                {item.outputStandard.map((output, index) => (
                                                    <div key={index} className="syllabus__standard text-white rounded-pill mx-8 my-0 d-flex justify-content-center align-items-center p-2">{output.code}</div>
                                                ))}
                                            </TableCell>
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


    )
}

export default View