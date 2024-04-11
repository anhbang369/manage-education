import React from 'react';
import { useState } from 'react';
import "./trainingProgram.css";
import Data from '../training/DataTraining';
import ActionMenu from '../action/ActionMenu';
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';

const TrainingProgram = () => {

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
            <div className="container">
                <div>
                    <h5 className="training__program-header">Training program</h5>
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

                <div className="syllabus__table">
                    <table>
                        <thead>
                            <tr className='table__header'>
                                <th>ID<i class="bi bi-filter-left"></i></th>
                                <th>Program name<i class="bi bi-filter-left"></i></th>
                                <th>Created on<i class="bi bi-filter-left"></i></th>
                                <th>Created by<i class="bi bi-filter-left"></i></th>
                                <th>Duration<i class="bi bi-filter-left"></i></th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    <td className='table__syllabus'>{item.id}</td>
                                    <td className='table__syllabus'>{item.name}</td>
                                    <td className='table__syllabus'>{item.created}</td>
                                    <td className='table__syllabus'>{item.createBy}</td>
                                    <td className='table__syllabus'>{item.duration}</td>
                                    <td className='table__syllabus status'>
                                        <p className='table__syllabus-status'>{item.output1}</p>
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
        </>
    )
}

export default TrainingProgram