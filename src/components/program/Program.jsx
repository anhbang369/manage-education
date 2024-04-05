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

                {Data.map((item, index) => (
                    <div className='content__syllabus' key={index}>
                        <div className='content__component'>
                            <div className='content__com'><b>{item.title}</b></div>
                            <div className='content__component-div'><p>{item.status}</p></div>
                        </div>
                        <div className='content__prgram'>
                            <p className='content__prgram-p'>{item.programName}</p>
                            <p className='content__prgram-p'>|</p>
                            <p className='content__prgram-p'>{item.duration}</p>
                            <p className='content__prgram-p'>|</p>
                            <p className='content__prgram-p'>Modified on {item.modifiedDate} by {item.modifiedBy}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Program

const Data = [
    {
        id: 1,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep"
    },
    {
        id: 2,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep"
    },
    {
        id: 3,
        title: "Linux",
        status: "Active",
        programName: "LIN v2.0",
        duration: "4 days (12 hours)",
        modifiedDate: "23/07/2024",
        modifiedBy: "jonhy Deep"
    }
]