import React from 'react';
import "./userPermission.css";
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPermission = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
                <div className="container">
                    <h4 className='user__permission'>User Permission</h4>
                    <div className='user__permission-end'><button className='user__permission-button'><i class="bi bi-plus-circle"></i> Add new</button></div>

                    <div className="syllabus__table">
                        <table>
                            <thead>
                                <tr className='table__header'>
                                    <th className='th__table-header'>Role name</th>
                                    <th>    Syllabus</th>
                                    <th>Training program</th>
                                    <th>Class</th>
                                    <th>Learning material</th>
                                    <th>User</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className='table__syllabus'>Super Admin</td>
                                    <td className='table__syllabus'>
                                        <Form.Select aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus color-table'>
                                        <i class="bi bi-star"></i> Full access
                                    </td>

                                </tr>

                                <tr>
                                    <td className='table__syllabus'>Class Admin</td>
                                    <td className='table__syllabus'>
                                        <Form.Select aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus color-table'>
                                        <i class="bi bi-plus-circle"></i> Create
                                    </td>

                                </tr>

                                <tr>
                                    <td className='table__syllabus'>Trainer</td>
                                    <td className='table__syllabus'>
                                        <Form.Select aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus'><Form.Select aria-label="Default select example">
                                        <option>Permission</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></td>
                                    <td className='table__syllabus color-table'>
                                        <i class="bi bi-eye"></i> View
                                    </td>

                                </tr>

                                <tr>
                                    <td className='table__syllabus'>Super Admin</td>
                                    <td className='table__syllabus'>
                                        <Form.Select aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </td>
                                    <td className='table__syllabus color-table'><i class="bi bi-eye"></i> View</td>
                                    <td className='table__syllabus color-table'><i class="bi bi-eye"></i> View</td>
                                    <td className='table__syllabus color-table'><i class="bi bi-eye"></i> View</td>
                                    <td className='table__syllabus color-table'>
                                        <i class="bi bi-eye-slash"></i> Access denied
                                    </td>

                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default UserPermission