import React from 'react';
import { useState, useEffect } from 'react';
import { getMaterials } from "../../services/MaterialService";
import ReactPaginate from 'react-paginate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ViewMaterial = () => {
    const [material, setMaterial] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [materialSearch, setMaterialSearch] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMaterials();
                console.log(data);
                setMaterial(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //search by
    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
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

    //search
    const handleSearch = () => {
        if (material !== null) {
            const filteredData = material.filter(item => {
                let isMatch = false;

                const relationCount = searchHistory.reduce((count, searchItem) => {
                    const searchTextLowerCase = searchItem.searchText.toLowerCase();
                    const nameMatch = (item.name !== null ? item.name.toLowerCase() : "").includes(searchTextLowerCase);
                    const codeMatch = (item.createdBy !== null ? item.createdBy.toLowerCase() : "").includes(searchTextLowerCase);
                    return count + (nameMatch ? 1 : 0) + (codeMatch ? 1 : 0);
                }, 0);

                const isRelationMatch = relationCount === searchHistory.length;

                if (isRelationMatch) {
                    isMatch = true;
                }

                return isMatch;
            });

            setMaterialSearch(filteredData);
        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    let totalPages = 0;
    let currentData = [];


    if (searchHistory.length === 0) {
        totalPages = Math.ceil(material && material.length / itemsPerPage);
        currentData = material && material.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );
    } else {
        totalPages = Math.ceil(materialSearch && materialSearch.length / itemsPerPage);
        currentData = materialSearch && materialSearch.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );
    }


    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className='p-0'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div>
                            <h5 className='bg-core text-white p-1 border border-white'>Material</h5>
                            <div className="row p-1">
                                <div className="col-md-9 d-flex justify-content-start">
                                    <div>
                                        <div className="input-with-icon">
                                            <i class="bi bi-search"></i>
                                            <input type="text" className="search__by" placeholder='Search by ...' value={searchText}
                                                onChange={handleSearchTextChange}
                                                onKeyPress={handleEnterPress} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
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
                                            <TableCell align="left" className='p-1 text-white'>Name<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Created on<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Created by<i class="bi bi-filter-left"></i></TableCell>
                                            <TableCell align="left" className='p-1 text-white'>Status<i class="bi bi-filter-left"></i></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentData && currentData.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left" className='p-1'>
                                                    {item.id}
                                                </TableCell>
                                                <TableCell align="left" className='p-1'>
                                                    <a className='text-decoration-none' href={item.url}>{item.name}</a>
                                                </TableCell>
                                                <TableCell align="left" className='p-1'>{item.createdDate && item.createdDate.slice(0, 10)}</TableCell>
                                                <TableCell align="left" className='p-1'>{item.createdBy}</TableCell>
                                                <TableCell align="left" className='p-1'><p className='bg-core text-white rounded text-center'>{item.materialStatus}</p></TableCell>

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
                        </div>
                    </ Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default ViewMaterial