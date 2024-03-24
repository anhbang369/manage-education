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
                    <h4 className="other__location">Time Location</h4>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"180px"}
                    />
                </div>
                <div className="other__scheme">
                    <h4 className="other__location">Assessment scheme</h4>
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
                <h4 className="train__title">Trainning delivery priciple</h4>
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

            <div className="save__general">
                <button className="general__pre">Previous</button>
                <div>
                    <a href="#" className="link__cancal">Cancal</a>
                    <button className="general__draft">Save as draft</button>
                    <button className="general__next">Next</button>
                </div>
            </div>
        </>
    )
}

export default OthersCreate