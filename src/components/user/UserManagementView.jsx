import React from 'react';
import { useState } from 'react';
import ActionMenu from '../action/ActionMenu';
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';

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
        <>
            <div className="container">
                <div>
                    <h5 className="training__program-header">Training program</h5>
                </div>
                <div className="syllabus__func">
                    <div className="syllabus__search">
                        <div className="input-with-icon">
                            <i class="bi bi-search"></i>
                            <input type="text" className="search__by" placeholder='Search by ...' />
                        </div>
                        <div className="input--with-icon">
                            <button className='filter__training'><i class="bi bi-filter"></i>    <b>Filter</b></button>
                        </div>
                    </div>

                    <div className="syllabus__import">
                        <button className="import" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                        <button className="syllabus__add"><i class="bi bi-plus-circle"></i> Add syllabus</button>
                    </div>
                </div>

                <div className="syllabus__table">
                    <table>
                        <thead>
                            <tr className='table__header'>
                                <th>ID<i class="bi bi-filter-left"></i></th>
                                <th>Fullname<i class="bi bi-filter-left"></i></th>
                                <th>Email<i class="bi bi-filter-left"></i></th>
                                <th>Date of birth<i class="bi bi-filter-left"></i></th>
                                <th>Gender<i class="bi bi-filter-left"></i></th>
                                <th>Level<i class="bi bi-filter-left"></i></th>
                                <th>Type<i class="bi bi-filter-left"></i></th>
                                <th>Status<i class="bi bi-filter-left"></i></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    <td className='table__syllabus'>{item.id}</td>
                                    <td className='table__syllabus'>{item.name}</td>
                                    <td className='table__syllabus'>{item.email}</td>
                                    <td className='table__syllabus'>{item.birth}</td>
                                    <td className='table__syllabus'><i class={`bi bi-person-fill ${getClassForGender(item.sex)}`}></i></td>
                                    <td className='table__syllabus'>{item.level}</td>
                                    <td className='table__syllabus status'>
                                        <p className={`syllabus_p ${getClassForType(item.type)}`}>{item.type}</p>
                                    </td>
                                    <td className='table__syllabus status'>
                                        <p className={`syllabus_p ${getClassForStatus(item.status)}`}>{item.status}</p>
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