import React from 'react';
import "./import.css";
import { useState } from 'react';
import { useEffect } from 'react';
import Excel from "../../assets/SyllabusTemplate.xlsx";
import { importSyllabus } from '../../services/SyllabusService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Import = ({ property }) => {

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
                await importSyllabus(file);
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

    console.log(property);


    const [importOpen, setImportOpen] = useState(property);

    useEffect(() => {
        setImportOpen(property);
    }, [property]);
    const handleClose = () => {
        setImportOpen(false);
    };
    const handleCloseNo = () => {
        setOpenNo(false);
    };

    console.log(importOpen);
    return (
        <>
            <div style={{ display: importOpen ? 'block' : 'none' }} className="import__container box-shadow-1">
                <div className="setting__content">
                    <h3 className="import__title">Import Syllabus</h3>
                </div>
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
                        <div className="action__info"><a download={Excel} href='#' className="link">Download</a></div>

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

                <div className="btn__active">
                    <a href="#" className="btn__cancel" onClick={handleClose}>Cancel</a>
                    <button className="btn__import" onClick={handleImport}>Import</button>
                </div>
            </div>
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

export default Import