import React from 'react';
import "./classStepTwo.css";

const ClassStepTwo = () => {
    return (
        <>
            <div className='container'>
                <div className='row class__header-view'>
                    <h6>Class</h6>
                    <div className='row'>
                        <div className='col-md-11 row'>
                            <div className='col-md-4'><h4 className='class__header-view-create'>Fresher Develop Operation</h4></div>
                            <div className='col-md-8'><p className='header__plain'>Plaining</p></div>
                        </div>
                        <div className='col-md-1'>
                            <i class="bi bi-three-dots"></i>
                        </div>
                    </div>

                    <div className='class__name-icon'>
                        <div className='header-view-text'>
                            <p> days ( hours)</p>
                        </div>
                        <div className='header-view-text'>
                            <p>|</p>
                        </div>
                    </div>
                </div>

                <div className='row class__container-view'>
                    <div className='col-md-4 container__first-left'>
                        <h6 className='container__first-title create'><i class="bi bi-calendar"></i> General</h6>
                        <h6 className='container__first-title create' ><i class="bi bi-star"></i> Attendee</h6>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-7 '>
                        <div className='container__first-title create'>
                            <p className='container__first-text'><i class="bi bi-calendar"></i> Time frame</p>
                            <p className='container__first-text'>25-Apr-22 to 21-July-22</p>
                        </div>
                    </div>
                </div>

                <h6 className='training__program-tabs create'>Training program</h6>
                <div className='training__program-components'>
                    <p className='training__program-components-text'>Training program name</p>
                    <div className="input-with-icon">
                        <i class="bi bi-search"></i>
                        <input type="text" className="search__by" placeholder='Search by ...' />
                    </div>
                </div>

                <div className="row save__general margin">
                    <div className="col-md-1"></div>
                    <div className="col-md-7"></div>
                    <div className="row col-md-4">
                        <div className="col-md-3"><button className="general__cancel"><a href="#" className="link__cancal">Cancal</a></button></div>
                        <div className="col-md-6"><button className="general__draft">Save as draft</button></div>
                        <div className="col-md-2"><button className="general__next">Next</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassStepTwo