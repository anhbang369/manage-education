import React from 'react';
import "./program.css";
import ActionMenuProgram from '../action/ActionMenuProgram';

const Program = () => {
    return (
        <>
            <div className="container">
                <div className="container__header">
                    <h6 className="program__title">Training program</h6>
                    <div className="row">
                        <div className='col-md-4 row'>
                            <div className='col-md-9'>
                                <h4>DevOps Foundation</h4>
                            </div>
                            <div className='col-md-3'>
                                <p className='program__title-action'>Active</p>
                            </div>
                        </div>
                        <div className='col-md-7'></div>
                        <div className='col-md-1'>
                            <ActionMenuProgram></ActionMenuProgram>
                        </div>
                    </div>
                </div>

                <div className='syllabus__time'><p className='syllabus__date'>8</p> <span className='date__span'>days (68 hours)</span></div>
                <p className='info__detail'>Modified on 23/07/2024 by <b>Anh Bang</b></p>
                <h6 className="content__program"><b>Content</b></h6>
                <div className='content__syllabus'>
                    <div className='content__component'>
                        <div className='content__com'><b>Linux</b></div>
                        <div className='content__component-div'><p>Active</p></div>
                    </div>
                    <div className='content__prgram'>
                        <p className='content__prgram-p'>LIN v2.0</p>
                        <p className='content__prgram-p'>|</p>
                        <p className='content__prgram-p'>4 days (12 hours)</p>
                        <p className='content__prgram-p'>|</p>
                        <p className='content__prgram-p'>Modified on 23/07/2024 by jonhy Deep</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Program