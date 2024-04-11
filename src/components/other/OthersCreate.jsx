import React from 'react';
import "./othersCreate.css";
import { Chart } from "react-google-charts";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';

export const data = [
    ["Task", "Hours per Day"],
    ["Assignment/Lab", 54],
    ["Concept/Lecture", 29],
    ["Guide/Review", 9],
    ["Test/Quiz", 1],
    ["Exam", 6],
];

const OthersCreate = () => {
    return (
        <>
            <div className="general__content">
                <div className="other__scheme">
                    <h6 className="other__location">Time Location</h6>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"180px"}
                    />
                </div>
                <div className="other__scheme">
                    <h6 className="other__location">Assessment scheme</h6>
                    <div className="d-flex justify-content-start my-0 mx-7">
                        <div>
                            <p className='my-1 mx-2'>Quiz*</p>
                            <p className='my-1 mx-2'>Assignment*</p>
                            <p className='my-1 mx-2'>Final**</p>
                        </div>
                        <div>
                            <div>
                                <input type="number" class="form-control h-50 w-50 p-0 mx-3 my-1" aria-describedby="basic-addon1" />
                            </div>
                            <div>
                                <input type="number" class="form-control h-50 w-50 p-0 mx-3 my-1" aria-describedby="basic-addon1" />
                            </div>
                            <div>
                                <input type="number" class="form-control h-50 w-50 p-0 mx-3 my-1" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex border-bottom border-black border-top border-black mx-2">
                        <p className="d-flex h-50">Final Theory* <input type="number" class="form-control h-50 w-25 p-0 mx-3 my-1" aria-describedby="basic-addon1" /></p>
                        <p className="d-flex h-50">Final Theory* <input type="number" class="form-control h-50 w-25 p-0 mx-3 my-1" aria-describedby="basic-addon1" /></p>
                    </div>
                    <div className='ms-2'>
                        <b>Passing criteria</b>
                        <div className='d-flex'>
                            <p className='p__criterial '>GPA* </p>
                            <input type="number" class="form-control h-50 w-25 p-0 mx-3 my-1" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="other__trainning">
                <h6 className="train__title">Trainning delivery priciple</h6>
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

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4 ms-3">Previous</button>
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

export default OthersCreate