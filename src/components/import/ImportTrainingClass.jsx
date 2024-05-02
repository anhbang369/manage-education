import React from 'react';
import "./import.css";
import { useState } from 'react';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { importTrainingClass } from '../../services/TrainingClassService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ImportTrainingClass = ({ property }) => {
    //notification
    const [openNo, setOpenNo] = useState(false);

    const [file, setFile] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleImport = async () => {
        if (file) {
            try {
                await importTrainingClass(file);
                setNotificationMessage('Import successful.');
                console.log('Import successful');
                setOpenNo(true);
            } catch (error) {
                setNotificationMessage('Import fail.');
                console.error('Import failed:', error);
                setOpenNo(true);
            }
        } else {
            console.error('No file selected');
        }
    };


    const handleCloseNo = () => {
        setOpenNo(false);
    };

    //open 
    //form import
    const [openFilter, setOpenFilter] = React.useState(property);
    useEffect(() => {
        setOpenFilter(property);
    }, [property]);

    const handleCloseForm = () => {
        setOpenFilter(false);
    };

    return (
        <>
            <React.Fragment>
                <Dialog
                    open={openFilter}
                    onClose={handleCloseForm}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleCloseForm();
                        },
                    }}
                >
                    <DialogTitle className='text-center bg-core rounded-top p-0 text-white fs-18'>Import Class</DialogTitle>
                    <DialogContent>
                        <div className="import__setting">
                            <h4 className="fs-14">Import setting</h4>
                            <div className="setting__info">
                                <p className="setting__detail">File (csv)</p>
                                <p className="setting__detail">Encoding type</p>
                                <p className="setting__detail">Column seperator</p>
                                <p className="setting__detail">Import template</p>
                            </div>
                            <div className="setting__action">
                                <div className="action__info"><input type='file' onChange={handleFileChange} /></div>
                                <div className="action__info">
                                    <select name="info__drop">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select></div>
                                <div className="action__info">
                                    <select name="info__drop">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select></div>
                                <div className="action__info"><a href="http://localhost:8080/api/v1/auth/customer/training-program/training-class/template/download" className="link">Download</a></div>

                            </div>
                        </div>

                        <div className="duplicate__control">
                            <div className="duplicate__title"><h4 className="title__header">Duplicate control</h4></div>
                            <div className="duplicate__title">
                                <p className="scan__title">Scanning</p>
                                <div className="code">
                                    <input type="checkbox" className="input__radio" />
                                    <label htmlFor="" className="label__title">Syllabus code</label>
                                    <input type="checkbox" className="input__radio" />
                                    <label htmlFor="" className="label__title">Syllabus name</label>

                                </div>
                                <p className="scan__title">Scanning</p>
                                <div className="code">
                                    <input type="radio" className="input__radio" />
                                    <label htmlFor="" className="label__title">Allow</label>
                                    <input type="radio" className="input__radio" />
                                    <label htmlFor="" className="label__title">Replicate</label>
                                    <input type="radio" className="input__radio" />
                                    <label htmlFor="" className="label__title">Skip</label>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <a href="#" className="btn__cancel" onClick={handleCloseForm}>Cancel</a>
                        <button className="btn__import" onClick={handleImport}>Import</button>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
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
        </>
    )
}

export default ImportTrainingClass