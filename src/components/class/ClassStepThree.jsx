import React from 'react';
import "./classStepThree.css";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassStepThree = () => {

    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }

    //show
    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    const [selected1, setSelected1] = useState(null)
    const toggle1 = (i) => {
        if (selected1 === i) {
            return setSelected1(null)
        }

        setSelected1(i)
    }

    return (
        <>
            <div className="container">
                <div className='row class__header-view'>
                    <h6>Class</h6>
                    <div className='row'>
                        <div className='col-md-11 row'>
                            <div className='col-md-4'><h4>Fresher Develop Operation</h4></div>
                            <div className='col-md-8'><p className='header__plain'>Plaining</p></div>
                        </div>
                        <div className='col-md-1'>
                            <i class="bi bi-three-dots"></i>
                        </div>
                    </div>
                    <p className='class__name'>HCM22FR_FR_DevOps_01</p>

                    <div className='class__name-icon'>
                        <div>
                            <p><b>31</b> days (97 hours)</p>
                        </div>
                        <div className='name-icon-pad'>
                            <p>|</p>
                        </div>
                        <div className='name-icon-pad'>
                            <i class="bi bi-journal-bookmark-fill"></i>
                        </div>
                        <div className='name-icon-pad'>
                            <i class="bi bi-person-hearts"></i>
                        </div>
                        <div className='name-icon-pad'>
                            <i class="bi bi-alphabet"></i>
                        </div>
                        <div className='name-icon-pad'>
                            <i class="bi bi-wifi"></i>
                        </div>
                        <div className='name-icon-pad'>
                            <i class="bi bi-hand-thumbs-up-fill"></i>
                        </div>
                    </div>
                </div>

                <div className='row class__container-view'>
                    <div className='col-md-4 container__first-left'>
                        <h6 className='container__first-title' onClick={() => toggle(1)}><i class="bi bi-calendar"></i> General</h6>
                        <div className={selected === 1 ? 'general__contain-first show' : 'general__contain-first'}>
                            <div className='row first__class-general'>
                                <div className='col-md-5'><b><i class="bi bi-alarm"></i> Class time</b></div>
                                <div className='col-md-7 class-general-input-time'>from <input type='time' /> to <input type='time' /></div>
                            </div>
                            <div className='row first__class-general gray'>
                                <div className='col-md-5'><b><i class="bi bi-house-door"></i> Location</b></div>
                                <div className='col-md-7 row'>
                                </div>
                            </div>
                            <div className='row first__class-general gray'>
                                <div className='col-md-5'><b><i class="bi bi-person"></i> Trainer</b></div>
                                <div className='col-md-7 row'>
                                </div>
                            </div>
                            <div className='row first__class-general'>
                                <div className='col-md-5'><b><i class="bi bi-star"></i> Admin</b></div>
                                <div className='col-md-7 row'>
                                    <div className='col-md-12'>
                                        <Form.Select className='select__class-three-general' aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                            <div className='row first__class-general'>
                                <div className='col-md-5'><b><i class="bi bi-recycle"></i> FSU</b></div>
                                <div className='col-md-7 row'>
                                    <div className='col-md-12'>
                                        <Form.Select className='select__class-three-general margin' aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col-md-12'>
                                        <Form.Select className='select__class-three-general' aria-placeholder='exam'>
                                            <option>Permission</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                            <div className='general__under'></div>
                            <div className='row first__class-general gray'>
                                <div className='col-md-5'><b>Created</b></div>
                                <div className='col-md-7'></div>
                            </div>
                            <div className='row first__class-general gray'>
                                <div className='col-md-5'><b>Review</b></div>
                                <div className='col-md-7'></div>
                            </div>
                            <div className='row first__class-general gray'>
                                <div className='col-md-5'><b>Approve</b></div>
                                <div className='col-md-7'></div>
                            </div>
                        </div>

                        <h6 className='container__first-title' onClick={() => toggle1(1)}><i class="bi bi-star"></i> Attendee
                            <Form.Select className='select__class-three' aria-placeholder='exam'>
                                <option>Permission</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </h6>
                        <div className={selected1 === 1 ? 'row attendee__component show' : 'row attendee__component'}>
                            <div className='col-md-4 attendee__first row'>
                                <div className='col-md-12'>Planned</div>
                                <div className='col-md-12'><input className='attendee__input' /></div>
                            </div>
                            <div className='col-md-4 attendee__center'>
                                <div className='col-md-12'>Accepted</div>
                                <div className='col-md-12'><input className='attendee__input' /></div>
                            </div>
                            <div className='col-md-4 attendee__last'>
                                <div className='col-md-12'>Actual</div>
                                <div className='col-md-12'><input className='attendee__input' /></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-7 '>
                        <div className='container__first-title'>
                            <p className='container__first-text'><i class="bi bi-calendar"></i> Time frame</p>
                            <p className='container__first-text time'><input type='datetime-local' /></p>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <Calendar
                                    value={dateState}
                                    onChange={changeDate}
                                />
                            </div>
                            <div className='col-md-6'>
                                <Calendar
                                    value={dateState}
                                    onChange={changeDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className='training__program-tabs'>Training program</h6>
                <div className='training__program-components'>
                    <h5>DevOps Foundation <button><i class="bi bi-pencil"></i></button></h5>
                    <div className='program-components-text'>
                        <p>31 days (97 hours)</p>
                        <p>|</p>
                        <p>Modified on 23/05/2023 by <b>Anh Bang</b></p>
                    </div>
                </div>

                {Data.map((item, index) => (
                    <div className='class__view-syllabus row'>
                        <div className='col-md-3 class__view-syllabus-image pad row'>

                        </div>
                        <div className='col-md-9 row class__view-syllabus-content'>
                            <div className='col-md-12 class__view-syllabus-info'>
                                <h5><b>{item.title}</b></h5><p>{item.status}</p>
                            </div>
                            <div className='col-md-12'>
                                <div className='program-components-text'>
                                    <p>{item.lin}</p>
                                    <p>|</p>
                                    <p>{item.days}</p>
                                    <p>|</p>
                                    <p>{item.modify}<b>{item.name}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className="row save__general margin">
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

export default ClassStepThree

const Data = [
    {
        id: 1,
        images: {
            image: "Image",
            image1: "Image",
            image2: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 2,
        images: {
            image: "Image",
            image1: "Image",
            image2: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 3,
        images: {
            image: "Image",
            image1: "Image",
            image2: "Image",
            image3: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 4,
        images: {
            image: "Image",
            image1: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },
    {
        id: 5,
        images: {
            image: "Image",
        },
        title: "Linux",
        status: "Active",
        lin: "LIN v2.0",
        days: "31 days (97 hours)",
        modify: "Modified on 23/05/2023 by ",
        name: "Anh Bang"
    },

]