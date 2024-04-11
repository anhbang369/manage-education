import React from 'react';
import "./generalCreate.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const GeneralCreate = () => {
    return (
        <>
            <div className="general__container-create">
                <div className='create__syllabus-input'>
                    <div className="general__content-create">
                        <div className="general__technica">
                            <div className='level__content-create'>
                                <div className='content__icon'>
                                    <p className="level__title">Level</p>
                                </div>
                                <select className="level__input">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>

                            </div>

                            <div className='level__content-create'>
                                <div className='content__icon'>
                                    <p className="level__title">Attendee number</p>
                                </div>

                                <input type="text" className="level__input-create" />
                            </div>
                        </div>
                        <div>
                            <b><span className="technical__title-create">Technical Requirements</span></b>

                            <div>
                                <textarea className='textarea__tech' name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='syllabus__objective'>
                        <b>Course Objective</b>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor&nbsp;5!</p>"
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event) => {
                                console.log(event);
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
                </div>
                <div className='create__time'>
                    <h6 className="time__header">Time allocation</h6>
                    <div className="time__container">
                        <div className="time_div">
                            <p className="time__p">Assignmant/Lab</p>
                            <p className="time__p">Concept/Lecture</p>
                            <p className="time__p">Guidle/Review</p>
                            <p className="time__p">Test/Quiz</p>
                            <p className="time__p">Exam</p>
                        </div>
                        <div className="time__div">
                            <p className="time__per">(0%)</p>
                            <p className="time__per">(0%)</p>
                            <p className="time__per">(0%)</p>
                            <p className="time__per">(0%)</p>
                            <p className="time__per">(0%)</p>
                        </div>
                    </div>
                </div>
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-transparent border-0 text-white rounded p-2"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                    </Grid>
                    <Grid item xs={2}>
                        <button className="bg-dark-subtle border-0 text-white rounded p-2">Save as draft</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-secondary border-0 text-white rounded p-2">Next</button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default GeneralCreate