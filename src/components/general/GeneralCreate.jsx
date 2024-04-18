import { useEffect, useState } from 'react';
import "./generalCreate.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSyllabusProgram } from "../../services/SyllabusLevelService";

const GeneralCreate = () => {
    //get list
    const [level, setLevel] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSyllabusProgram();
                console.log("this is dada: " + data);
                setLevel(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-md-between">
                <div className='w-75 h-100 box-shadow-black'>
                    <div className="general__content-create">
                        <div className="general__technica">
                            <div className='d-flex justify-content-start'>
                                <div className='d-flex'>
                                    <p className="fs-6">Level</p>
                                </div>
                                <select class="custom-select h-75 mx-3 border">
                                    {level ? (
                                        level.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    ) : (
                                        <option>Loading...</option>
                                    )}

                                </select>

                            </div>

                            <div className='d-flex justify-content-start'>
                                <p className="fs-6 me-3">Attendee number</p>

                                <div className='h-25'>
                                    <input type="number" class="form-control h-25" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <b><span className="fw-bold text-black pb-2">Technical Requirements</span></b>

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
                    <h6 className="bg-core text-white p-1 text-center rounded-top">Time allocation</h6>
                    <div className="d-flex text-black">
                        <div className="p-3">
                            <p className="fw-normal">Assignmant/Lab</p>
                            <p className="fw-normal">Concept/Lecture</p>
                            <p className="fw-normal">Guidle/Review</p>
                            <p className="fw-normal">Test/Quiz</p>
                            <p className="fw-normal">Exam</p>
                        </div>
                        <div className="p-3">
                            <p className="fw-normal">(0%)</p>
                            <p className="fw-normal">(0%)</p>
                            <p className="fw-normal">(0%)</p>
                            <p className="fw-normal">(0%)</p>
                            <p className="fw-normal">(0%)</p>
                        </div>
                    </div>
                </div>
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                    </Grid>
                    <Grid item xs={2}>
                        <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Save as draft</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4">Next</button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default GeneralCreate