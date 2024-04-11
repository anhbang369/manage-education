import React from 'react';
import { useState } from 'react';
import "./trainingClassList.css";
import ReactPaginate from 'react-paginate';
import Import from '../import/Import';
import ActionMenu from '../action/ActionMenu';

const TrainingClassListView = () => {

    const getClassForFsu = (fsu) => {
        switch (fsu) {
            case 'Fresher':
                return 'blue-bg';
            case 'Online fee-fresher':
                return 'green-bg';
            case 'Intern':
                return 'gray-bg';
            case 'Offline fee-fresher':
                return 'organ-bg';
            default:
                return '';
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
            <div className='syllabus__container'>
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
                            <button className='text-white p-1 border-0 rounded bg-primary'><i class="bi bi-filter"></i>    <b>Filter</b></button>
                        </div>
                    </div>

                    <div className="col-md-3">
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
                                <th>Class<i class="bi bi-filter-left"></i></th>
                                <th>Class Code<i class="bi bi-filter-left"></i></th>
                                <th>Created on<i class="bi bi-filter-left"></i></th>
                                <th>Created by<i class="bi bi-filter-left"></i></th>
                                <th>Duration<i class="bi bi-filter-left"></i></th>
                                <th>Attendee<i class="bi bi-filter-left"></i></th>
                                <th>Location<i class="bi bi-filter-left"></i></th>
                                <th>FSU<i class="bi bi-filter-left"></i></th>
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
                                    <td className="table__syllabus"><p className={`syllabus_p ${getClassForFsu(item.attendee)}`}>{item.attendee}</p></td>
                                    <td className='table__syllabus'>{item.location}</td>
                                    <td className='table__syllabus'>{item.fsu}</td>

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

export default TrainingClassListView

const Data = [
    {
        "id": "1",
        sullabus: "C# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "2",
        sullabus: "C# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Online fee-fresher",
        location: "Ha Noi",
        fsu: "FHM"
    },
    {
        "id": "3",
        sullabus: "C# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Intern",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "4",
        sullabus: "D# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "5",
        sullabus: "E# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Offline fee-fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "6",
        sullabus: "F# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "7",
        sullabus: "G# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Intern",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "8",
        sullabus: "H# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Intern",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "9",
        sullabus: "J# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Offline fee-fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "10",
        sullabus: "K# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Online fee-fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "11",
        sullabus: "C# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
    {
        id: "12",
        sullabus: "C# Programming Language",
        code: "NLP",
        created: "22/04/2021",
        createBy: "HaNNT22",
        duration: "12 days",
        attendee: "Fresher",
        location: "Ho Chi Minh",
        fsu: "FHM"
    },
]