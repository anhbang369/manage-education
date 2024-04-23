import React from 'react';
import { useState, useEffect } from 'react';
import "./othersCreate.css";
import { Chart } from "react-google-charts";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createSyllabus } from '../../services/SyllabusService';
export const data = [
    ["Task", "Hours per Day"],
    ["Assignment/Lab", 54],
    ["Concept/Lecture", 29],
    ["Guide/Review", 9],
    ["Test/Quiz", 1],
    ["Exam", 6],
];

const OthersCreate = ({ updatedRequestBody, onPreviousClick }) => {
    console.log('haha' + JSON.stringify(updatedRequestBody))

    const [scheme, setScheme] = useState({
        assignment: 0,
        quiz: 0,
        exam: 0,
        gpa: 0,
        finalPoint: 0,
        finalTheory: 0,
        finalPractice: 0,
    });

    const [principle, setPrinciple] = useState({
        trainees: '',
        trainer: '',
        training: '',
        re_test: '',
        marking: '',
        waiverCriteria: '',
        others: ''
    });

    const handleSchemeChange = (field, value) => {
        setScheme(prevSyllabusGeneral => ({
            ...prevSyllabusGeneral,
            [field]: value
        }));
    };

    const handlePricipleChange = (field, value) => {
        setPrinciple(prevSyllabusGeneral => ({
            ...prevSyllabusGeneral,
            [field]: value
        }));
    };

    useEffect(() => {
        const updatedRequestBodyy = {
            ...updatedRequestBody,
            assessmentScheme: scheme,
            deliveryPrinciple: principle
        };
        console.log('Full: ' + JSON.stringify(updatedRequestBodyy))
        console.log('Full second: ' + JSON.stringify(updatedRequestBody))
    }, [scheme, principle]);


    console.log(scheme)
    console.log(principle)

    const handlePreviousClick = () => {
        onPreviousClick();
    };

    const handleSaveClick = async () => {
        try {
            const updatedRequestBodyy = {
                ...updatedRequestBody,
                assessmentScheme: scheme,
                deliveryPrinciple: principle
            };
            const response = await createSyllabus(updatedRequestBodyy);

            if (response.ok) {
                console.log('Create successful');
            } else {
                console.error('Create failed');
            }
        } catch (error) {
            console.error('Error creating syllabus:', error);
        }
    };

    return (
        <>
            <div className="general__content">
                <div className="other__scheme">
                    <h6 className="bg-core text-center p-1 rounded-top text-white">Time Location</h6>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"180px"}
                    />
                </div>
                <div className="other__scheme">
                    <h6 className="bg-core text-center p-1 rounded-top text-white">Assessment scheme</h6>
                    <div className="d-flex justify-content-start my-0 mx-7">
                        <div>
                            <p className='my-1 mx-2'>Quiz*</p>
                            <p className='my-1 mx-2'>Assignment*</p>
                            <p className='my-1 mx-2'>Final**</p>
                        </div>
                        <div>
                            <div>
                                <input type="number" class="form-control h-50 w-50 p-0 mx-3 my-1" aria-describedby="basic-addon1" onChange={(e) => handleSchemeChange('quiz', parseInt(e.target.value))} value={scheme.quiz} />
                            </div>
                            <div>
                                <input type="number" class="form-control h-50 w-50 p-0 mx-3 my-1" aria-describedby="basic-addon1" onChange={(e) => handleSchemeChange('assignment', parseInt(e.target.value))} value={scheme.assignment} />
                            </div>
                            <div>
                                <input type="number" class="form-control h-50 w-50 p-0 mx-3 my-1" aria-describedby="basic-addon1" onChange={(e) => handleSchemeChange('finalPoint', parseInt(e.target.value))} value={scheme.finalPoint} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex border-bottom border-black border-top border-black mx-2">
                        <p className="d-flex h-50">Final Theory* <input type="number" class="form-control h-50 w-25 p-0 mx-3 my-1" aria-describedby="basic-addon1" onChange={(e) => handleSchemeChange('finalTheory', parseInt(e.target.value))} value={scheme.finalTheory} /></p>
                        <p className="d-flex h-50">Final Theory* <input type="number" class="form-control h-50 w-25 p-0 mx-3 my-1" aria-describedby="basic-addon1" onChange={(e) => handleSchemeChange('finalPractice', parseInt(e.target.value))} value={scheme.finalPractice} /></p>
                    </div>
                    <div className='ms-2'>
                        <b>Passing criteria</b>
                        <div className='d-flex'>
                            <p className='p__criterial '>GPA* </p>
                            <input type="number" class="form-control h-50 w-25 p-0 mx-3 my-1" aria-describedby="basic-addon1" onChange={(e) => handleSchemeChange('gpa', parseInt(e.target.value))} value={scheme.gpa} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="other__trainning">
                <h6 className="bg-core p-1 rounded-top text-white">Trainning delivery priciple</h6>
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Trainees</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.trainees}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('trainees', data);
                    }}
                />
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Trainer</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.trainer}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('trainer', data);
                    }}
                />
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Training</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.training}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('training', data);
                    }}
                />
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Re-test</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.re_test}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('re_test', data);
                    }}
                />
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Marking</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.marking}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('marking', data);
                    }}
                />
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Waiver Criteria</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.waiverCriteria}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('waiverCriteria', data);
                    }}
                />
                <h6 className='fw-bold ms-1'><i class="bi bi-shield-check text-primary"></i> Other</h6>
                <CKEditor
                    editor={ClassicEditor}
                    data={scheme.others}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handlePricipleChange('others', data);
                    }}
                />

            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4 ms-3" onClick={handlePreviousClick}>Previous</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                    </Grid>
                    <Grid item xs={2}>
                        <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Save as draft</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4" onClick={handleSaveClick}>Save</button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default OthersCreate