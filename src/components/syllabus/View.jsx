import { useState } from 'react';
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


const View = () => {

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
        <React.Fragment>
            <CssBaseline />
            <Container fixed className='p-0'>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                    <div className='syllabus__container'>
                        <h4 className="syllabus__head">S y l l a b u s </h4>
                        <div className="syllabus__underline"></div>
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
                                <button className="border border-0 text-white rounded me-3 px-2 py-1"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                            </div>
                        </div>
                        <div className="mt-2 ms-10 d-flex">
                            <p className="bg-dark text-white rounded ms-4 mb-3 p-1 d-flex w-10">foundation <i class="bi bi-x-lg"></i></p>
                            <p className="bg-dark text-white rounded ms-3 mb-3 p-1 d-flex w-10">HaNTT <i class="bi bi-x-lg"></i></p>
                        </div>

                        <div className="syllabus__table">
                            <table>
                                <thead>
                                    <tr className='table__header'>
                                        <th>Syllabus<i class="bi bi-filter-left"></i></th>
                                        <th>Code<i class="bi bi-filter-left"></i></th>
                                        <th>Created on<i class="bi bi-filter-left"></i></th>
                                        <th>Created by<i class="bi bi-filter-left"></i></th>
                                        <th>Duration<i class="bi bi-filter-left"></i></th>
                                        <th>Output standard</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentData.map((item) => (
                                        <tr key={item.id}>
                                            <td className='table__syllabus'>{item.sullabus}</td>
                                            <td className='table__syllabus'>{item.code}</td>
                                            <td className='table__syllabus'>{item.created}</td>
                                            <td className='table__syllabus'>{item.createBy}</td>
                                            <td className='table__syllabus'>{item.duration}</td>
                                            <td className='table__syllabus'>
                                                <div className="standard__info">
                                                    {Object.values(item.output).map((output, index) => (
                                                        <p key={index} className="syllabus__standard">{output}</p>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className='table__syllabus'>
                                                <ActionMenu></ActionMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
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