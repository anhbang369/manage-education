import React from 'react';
import "./generalCreate.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

            <div className="row">
                <div className="col-md-9"></div>
                <div className="col-md-3 row">
                    <div className="col-md-4"><button className="general__cancel"><a href="#" className="link__cancal">Cancal</a></button></div>
                    <div className="col-md-6"><button className="general__draft">Save as draft</button></div>
                    <div className="col-md-2"><button className="general__next">Next</button></div>
                </div>
            </div>
        </>
    )
}

export default GeneralCreate