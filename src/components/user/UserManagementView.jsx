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
import { getUserData, deActiveUser, deleteUser, getUserById, createUser } from '../../services/UserService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import MenuItem from '@mui/joy/Option';

const UserManagementView = () => {

    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);

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

    const [selectedItemId, setSelectedItemId] = useState(null);
    const handleDropdownItemClick = (itemId) => {
        setSelectedItemId(itemId);
        deActiveUser(itemId);
        setNotificationMessage('De-active successful.');
        setOpenNo(true);
    };

    const handleDropdownItemClickDelete = (itemId) => {
        setSelectedItemId(itemId);
        deleteUser(itemId);
        setNotificationMessage('Delete successful.');
        setOpenNo(true);
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
                                        <button className='text-white p-1 border-0 rounded bg-core'><i class="bi bi-filter"></i>    <b>Filter</b></button>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-warning" onClick={() => setImportOpen(true)}><i class="bi bi-cloud-upload"></i> Import</button>
                                    {/* <button className="border border-0 text-white rounded me-3 px-1 py-1 bg-core"><i class="bi bi-plus-circle"></i> Add new</button> */}
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
                                                                    <Dropdown.Item eventKey="1" className='ms-1'><i className="bi bi-plus-circle"></i> Add training program</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="2" onClick={() => handleGetUserById(item.id)}>
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
                                                                    <Dropdown.Item eventKey="3" onClick={() => handleDropdownItemClick(item.id)} className='ms-1'>
                                                                        <i className="bi bi-copy"></i> De-activate user
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