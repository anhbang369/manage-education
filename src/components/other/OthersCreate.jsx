import React from 'react';
import "./othersCreate.css";
import { Chart } from "react-google-charts";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
                    <div className="other__component-create">
                        <div className="quiz__create">
                            <p className='quiz__p'>Quiz*</p>
                            <p className='quiz__q'>Assignment*</p>
                            <p className='quiz__q'>Final**</p>
                        </div>
                        <div className="quiz__create">
                            <div>
                                <input type="text" className="quiz__input" />
                            </div>
                            <div>
                                <input type="text" className="quiz__input" />
                            </div>
                            <div>
                                <input type="text" className="quiz__input" />
                            </div>
                        </div>
                    </div>
                    <div className="other__component-create">
                        <p className="theory__create">Final Theory* <input className='theory__input' type="text" /></p>
                        <p className="theory__create">Final Theory* <input className='theory__input' type="text" /></p>
                    </div>
                    <div className='criterial__create'>
                        <b>Passing criteria</b>
                        <p className='p__criterial'>GPA* <input className='theory__input' type="text" /></p>
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

            <div className="row save__general">
                <div className="col-md-1"><button className="general__pre">Previous</button></div>
                <div className="col-md-7"></div>
                <div className="row col-md-4">
                    <div className="col-md-3"><button className="general__cancel"><a href="#" className="link__cancal">Cancal</a></button></div>
                    <div className="col-md-6"><button className="general__draft">Save as draft</button></div>
                    <div className="col-md-2"><button className="general__next">Next</button></div>
                </div>
            </div>
        </>
    )
}

export default OthersCreate