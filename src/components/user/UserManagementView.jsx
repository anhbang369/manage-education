import React from 'react';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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
import { getUserData, deActiveUser, deleteUser, getUserById, createUser, getUserStatus, getUserRoles, getUserLevels, getUserGenders } from '../../services/UserService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import MenuItem from '@mui/joy/Option';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const UserManagementView = () => {

    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);

    //get list
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState(null);
    const [gender, setGender] = useState(null);
    const [level, setLevel] = useState(null);
    const [role, setRole] = useState(null);
    const [filterValues, setFilterValues] = useState({
        role: [],
        level: [],
        gender: [],
        status: []
    });
    const [currentDat, setCurrentDat] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [userSearch, setUserSearch] = useState(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserStatus();
                console.log(data);
                setStatus(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserLevels();
                console.log(data);
                setLevel(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserRoles();
                console.log(data);
                setRole(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserGenders();
                console.log(data);
                setGender(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    //search
    const handleApplyClick = () => {
        setSearchHistory([])
        // Filter data based on selected filters
        const filteredData = userData.filter(item => {
            return (
                (filterValues.level.length === 0 || filterValues.level.includes(item.level)) &&
                (filterValues.gender.length === 0 || filterValues.gender.includes(item.gender)) &&
                (filterValues.status.length === 0 || filterValues.status.includes(item.status)) &&
                (filterValues.role.length === 0 || filterValues.role.includes(item.role.name))
            );
        });

        setCurrentDat(filteredData);
        console.log('check filter dont set: ' + JSON.stringify(filteredData))
        console.log('check filter: ' + JSON.stringify(currentDat))
        setFilterApplied(true);
    };

    //check box
    // Handle role checkbox change
    const handleRoleCheckboxChange = (event, selectedRole) => {
        const isChecked = event.target.checked;

        let updatedRoles = [];
        if (isChecked) {
            updatedRoles = [...filterValues.role, selectedRole];
        } else {
            updatedRoles = filterValues.role.filter(role => role !== selectedRole);
        }
        setFilterValues({ ...filterValues, role: updatedRoles });
    };

    // Handle level checkbox change
    const handleLevelCheckboxChange = (event, selectedLevel) => {
        const isChecked = event.target.checked;

        let updatedLevels = [];
        if (isChecked) {
            updatedLevels = [...filterValues.level, selectedLevel];
        } else {
            updatedLevels = filterValues.level.filter(level => level !== selectedLevel);
        }
        setFilterValues({ ...filterValues, level: updatedLevels });
    };

    // Handle gender checkbox change
    const handleGenderCheckboxChange = (event, selectedGender) => {
        const isChecked = event.target.checked;

        let updatedGenders = [];
        if (isChecked) {
            updatedGenders = [...filterValues.gender, selectedGender];
        } else {
            updatedGenders = filterValues.gender.filter(gender => gender !== selectedGender);
        }
        setFilterValues({ ...filterValues, gender: updatedGenders });
    };

    // Handle status checkbox change
    const handleStatusCheckboxChange = (event, selectedStatus) => {
        const isChecked = event.target.checked;

        let updatedStatuses = [];
        if (isChecked) {
            updatedStatuses = [...filterValues.status, selectedStatus];
        } else {
            updatedStatuses = filterValues.status.filter(status => status !== selectedStatus);
        }
        setFilterValues({ ...filterValues, status: updatedStatuses });
    };

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
        if (userData !== null) {
            const filteredData = userData.filter(item => {
                let isMatch = false;

                const relationCount = searchHistory.reduce((count, searchItem) => {
                    const searchTextLowerCase = searchItem.searchText.toLowerCase();
                    const nameMatch = (item.fullName !== null ? item.fullName.toLowerCase() : "").includes(searchTextLowerCase);
                    const codeMatch = (item.email !== null ? item.email.toLowerCase() : "").includes(searchTextLowerCase);
                    return count + (nameMatch ? 1 : 0) + (codeMatch ? 1 : 0);
                }, 0);

                const isRelationMatch = relationCount === searchHistory.length;

                if (isRelationMatch) {
                    isMatch = true;
                }

                return isMatch;
            });
            setUserSearch(filteredData);
            console.log('view data search by:', JSON.stringify(filteredData));
        }
    };


    useEffect(() => {
        handleSearch();
    }, [searchHistory]);




    //get use by id
    const [userIdData, setUserIdData] = useState({
        fullName: '',
        birthday: '',
        gender: '',
        email: '',
        password: '',
        level: ''
    });

    const handleGetUserById = async (itemId) => {
        try {
            const data = await getUserById(itemId);
            console.log(data);
            setUserIdData(data);
        } catch (error) {
            console.log(error);
        }
    };


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

    //notification
    const [openNo, setOpenNo] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleCloseNo = () => {
        setOpenNo(false);
    };

    // const [selectedItemId, setSelectedItemId] = useState(null);
    const handleDropdownItemClick = (itemId) => {
        // setSelectedItemId(itemId);
        deActiveUser(itemId);
        setNotificationMessage('De-active successful.');
        setOpenNo(true);
    };

    const handleDropdownItemClickDelete = (itemId) => {
        // setSelectedItemId(itemId);
        deleteUser(itemId);
        setNotificationMessage('Delete successful.');
        setOpenNo(true);
    };

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    let totalPages = 0;
    let currentData = [];


    if (!searchHistory.length) {
        if (filterApplied) {
            totalPages = Math.ceil(currentDat && currentDat.length / itemsPerPage);
            currentData = currentDat && currentDat.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
            );
        } else {
            totalPages = Math.ceil(userData && userData.length / itemsPerPage);
            currentData = userData && userData.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
            );
        }
    } else {
        if (userSearch !== null) {
            totalPages = Math.ceil(userSearch.length / itemsPerPage);
            currentData = userSearch.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
            );
        }
    }

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [importOpen, setImportOpen] = useState(false);

    const [openFilter, setOpenFilter] = React.useState(false);

    const handleClickOpen = () => {
        setOpenFilter(true);
    };

    const handleClose = () => {
        setOpenFilter(false);
    };

    //first chart cap
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className='p-0'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', width: '100%' }}>
                        <div>
                            <div>
                                <h5 className="text-white border border-white p-1 bg-core">User Management</h5>
                            </div>
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
                                    <div>
                                        <React.Fragment>
                                            <Button variant="outlined" onClick={handleClickOpen} className='text-white border-0 p-1 ms-2'
                                                style={{ backgroundColor: '#2d3748' }}>
                                                <i class="bi bi-filter"></i>    <b>Filter</b>
                                            </Button>
                                            <Dialog
                                                open={openFilter}
                                                onClose={handleClose}
                                                PaperProps={{
                                                    component: 'form',
                                                    onSubmit: (event) => {
                                                        event.preventDefault();
                                                        const formData = new FormData(event.currentTarget);
                                                        const formJson = Object.fromEntries(formData.entries());
                                                        const email = formJson.email;
                                                        console.log(email);
                                                        handleClose();
                                                    },
                                                }}
                                            >
                                                <DialogContent>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={3}>
                                                                <FormGroup>
                                                                    <InputLabel id="role-label">Role</InputLabel>
                                                                    {role && role.map((rl, idx) => (
                                                                        <FormControlLabel
                                                                            key={rl}
                                                                            control={<Checkbox checked={filterValues.role.includes(rl)} onChange={(event) => handleRoleCheckboxChange(event, rl)} />}
                                                                            label={capitalizeFirstLetter(rl)}
                                                                        />
                                                                    ))}
                                                                </FormGroup>

                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <FormGroup>
                                                                    <InputLabel id="status-label">Status</InputLabel>
                                                                    {status && status.map((st, idx) => (
                                                                        <FormControlLabel
                                                                            key={st}
                                                                            control={<Checkbox checked={filterValues.status.includes(st)} onChange={(event) => handleStatusCheckboxChange(event, st)} />}
                                                                            label={capitalizeFirstLetter(st)}
                                                                        />
                                                                    ))}
                                                                </FormGroup>

                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <FormGroup>
                                                                    <InputLabel id="level-label">Level</InputLabel>
                                                                    {level && level.map((lv, idx) => (
                                                                        <FormControlLabel
                                                                            key={lv}
                                                                            control={<Checkbox checked={filterValues.level.includes(lv)} onChange={(event) => handleLevelCheckboxChange(event, lv)} />}
                                                                            label={capitalizeFirstLetter(lv)}
                                                                        />
                                                                    ))}
                                                                </FormGroup>

                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <FormGroup>
                                                                    <InputLabel id="gender-label">Gender</InputLabel>
                                                                    {gender && gender.map((gd, idx) => (
                                                                        <FormControlLabel
                                                                            key={gd}
                                                                            control={<Checkbox checked={filterValues.gender.includes(gd)} onChange={(event) => handleGenderCheckboxChange(event, gd)} />}
                                                                            label={capitalizeFirstLetter(gd)}
                                                                        />
                                                                    ))}
                                                                </FormGroup>

                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button type="submit" onClick={handleApplyClick}>Apply</Button>

                                                </DialogActions>
                                            </Dialog>
                                        </React.Fragment>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    <React.Fragment>
                                        <Button
                                            backgroundColor="bg-core"
                                            className="border border-0 text-white rounded me-3 px-1 bg-core"
                                            onClick={() => setOpenAdd(true)}
                                        >
                                            <i class="bi bi-plus-circle"></i> Add new
                                        </Button>
                                        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
                                            <ModalDialog>
                                                <DialogTitle>Create new user</DialogTitle>
                                                <form
                                                    onSubmit={async (event) => {
                                                        event.preventDefault();
                                                        const formData = new FormData(event.target);
                                                        const userData = Object.fromEntries(formData);

                                                        try {
                                                            await createUser(userData);

                                                            console.log('User created successfully');
                                                            setOpenAdd(true);
                                                            setNotificationMessage('User created successfully.');
                                                            setOpenNo(true);
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}
                                                >
                                                    <Stack spacing={0}>
                                                        <FormControl>
                                                            <FormLabel>Name</FormLabel>
                                                            <Input name="fullName" autoFocus required />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel>Birthday</FormLabel>
                                                            <Input name="birthday" type='date' autoFocus required />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel>Gender</FormLabel>
                                                            <Input name="gender" autoFocus required />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel>Email</FormLabel>
                                                            <Input name="email" type='email' autoFocus required />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel>Password</FormLabel>
                                                            <Input name="password" type='password' autoFocus required />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel>Role</FormLabel>
                                                            <Select name="role" required placeholder="Choose one…">
                                                                <MenuItem value="STUDENT">STUDENT</MenuItem>
                                                                <MenuItem value="TRAINER">TRAINER</MenuItem>
                                                                <MenuItem value="CLASS ADMIN">CLASS ADMIN</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel>Level</FormLabel>
                                                            <Input name="level" required />
                                                        </FormControl>
                                                        <Button className='mt-2' type="submit">Submit</Button>
                                                    </Stack>
                                                </form>
                                            </ModalDialog>
                                        </Modal>
                                    </React.Fragment>

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
                                        {currentData && currentData.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{ 'td': { padding: 0 } }}
                                            >
                                                <TableCell align="left">
                                                    {item.id}
                                                </TableCell>
                                                <TableCell align="left">{item.fullName}</TableCell>
                                                <TableCell align="left">{item.email}</TableCell>
                                                <TableCell align="left">{item.birthday && item.birthday.slice(0, 10)}</TableCell>
                                                <TableCell align="left"><i class={`bi bi-person-fill ${getClassForGender(item.gender)}`}></i></TableCell>
                                                <TableCell align="left">{item.level}</TableCell>
                                                <TableCell align="left"><p className={`syllabus_p mt-1 ${getClassForType(item.role.name)}`}>{item.role.name}</p></TableCell>
                                                <TableCell align="left"><p className={`syllabus_p mt-1 ${getClassForStatus(item.status)}`}>{item.status}</p></TableCell>
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

                                                                    <Dropdown.Item eventKey="1" onClick={() => handleGetUserById(item.id)}>
                                                                        <React.Fragment>
                                                                            <Dropdown.Item eventKey="1" onClick={() => setOpen(true)} className='p-1'><i class="bi bi-pencil"></i> Update user</Dropdown.Item>
                                                                            <Modal open={open} onClose={() => setOpen(false)}>
                                                                                <ModalDialog>
                                                                                    <DialogTitle>New user</DialogTitle>
                                                                                    <form
                                                                                        onSubmit={(event) => {
                                                                                            event.preventDefault();
                                                                                            setOpen(false);
                                                                                        }}
                                                                                    >
                                                                                        <Stack spacing={0}>
                                                                                            <FormControl>
                                                                                                <FormLabel>Full Name</FormLabel>
                                                                                                <Input value={userIdData.fullName} onChange={(event) => setUserIdData({ ...userIdData, fullName: event.target.value })} />
                                                                                            </FormControl>
                                                                                            <FormControl>
                                                                                                <FormLabel>Birthday</FormLabel>
                                                                                                <Input value={userIdData.birthday} onChange={(event) => setUserIdData({ ...userIdData, birthday: event.target.value })} />
                                                                                            </FormControl>
                                                                                            <FormControl>
                                                                                                <FormLabel>Gender</FormLabel>
                                                                                                <Input value={userIdData.gender} onChange={(event) => setUserIdData({ ...userIdData, gender: event.target.value })} />
                                                                                            </FormControl>
                                                                                            <FormControl>
                                                                                                <FormLabel>Email</FormLabel>
                                                                                                <Input value={userIdData.email} onChange={(event) => setUserIdData({ ...userIdData, email: event.target.value })} />
                                                                                            </FormControl>
                                                                                            <FormControl>
                                                                                                <FormLabel>Level</FormLabel>
                                                                                                <Input
                                                                                                    value={userIdData.level}
                                                                                                    onChange={(event) => setUserIdData({ ...userIdData, level: event.target.value })}
                                                                                                />
                                                                                            </FormControl>
                                                                                            <Button type="submit" className='mt-3'>Submit</Button>
                                                                                        </Stack>
                                                                                    </form>
                                                                                </ModalDialog>
                                                                            </Modal>
                                                                        </React.Fragment>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="2" onClick={() => handleDropdownItemClick(item.id)} className='ms-1'>
                                                                        <i className="bi bi-copy"></i> De-activate user
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3" className='ms-1'><i className="bi bi-plus-circle">
                                                                    </i> Add training program
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item eventKey="4" onClick={() => handleDropdownItemClickDelete(item.id)} className='ms-1'>
                                                                        <i className="bi bi-trash3"></i> Delete syllabus
                                                                    </Dropdown.Item>
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
                            <ImportUser property={importOpen} />
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
        </>
    )
}

export default UserManagementView