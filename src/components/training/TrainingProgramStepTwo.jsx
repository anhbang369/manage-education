import React from 'react';
import "./trainingProgramStepTwo.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const TrainingProgramStepTwo = () => {
    return (
        <>
            <div className="container">
                <div className="header__step-two">
                    <h6 className="header__litle-small">Training program</h6>
                    <div className='header__litle-component'>
                        <h5 className="header__litle-small">DevOps Foundation</h5>
                        <p className="header__title-large">Inactive</p>
                    </div>
                </div>
                <p className='modified__content'>...days (...hours)</p>
                <p className='modified__content'>Modified on 21/07/2023 by <b>Anh Bang</b></p>
                <div className='modified__content-under'></div>
                <h6 className='content__header-prgram'>Content</h6>

                {Data.map((item, index) => (
                    <div className='syllabus_compo'>
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
                        <div className='content__component-delete'>
                            <i class="bi bi-trash"></i>
                        </div>
                    </div>

                ))}


                <div>
                    <label htmlFor=""><b>Select syllabus</b></label>
                    <div className="input-with-icon">
                        <i class="bi bi-search"></i>
                        <input type="text" className="search__by" placeholder='Search by ...' />
                    </div>
                </div>

                <div className="row save__general">
                    <div className="col-md-1"><button className="general__pre">Back</button></div>
                    <div className="col-md-7"></div>
                    <div className="row col-md-4">
                        <div className="col-md-6"></div>
                        <div className="col-md-3"><button className="general__cancel"><a href="#" className="link__cancal">Cancal</a></button></div>
                        <div className="col-md-2"><button className="general__next">Save</button></div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TrainingProgramStepTwo

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