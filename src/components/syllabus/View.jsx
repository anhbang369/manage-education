import { useState } from 'react';
import React from 'react';
import "./view.css";
import Data from './Data';
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';
import ActionMenu from '../action/ActionMenu';


const View = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 9;

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
        <div className='syllabus__container'>
            <h4 className="syllabus__head">S y l l a b u s </h4>
            <div className="syllabus__underline"></div>
            <div className="syllabus__func">
                <div className="syllabus__search">
                    <div className="input-with-icon">
                        <i class="bi bi-search"></i>
                        <input type="text" className="search__by" placeholder='Search by ...' />
                    </div>
                    <div className="input-with-icon">
                        <i class="bi bi-calendar"></i>
                        <input type="text" className="search__date" placeholder='Created date' />
                    </div>
                </div>

                <div className="syllabus__import">
                    <button className="import" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                    <button className="syllabus__add"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                </div>
            </div>
            <div className="syllabus__enter">
                <p className="enter__search">foundation <i class="bi bi-x-lg"></i></p>
                <p className="enter__search">HaNTT <i class="bi bi-x-lg"></i></p>
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

    )
}

export default View