import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./classView.css"

const ClassView = () => {

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
            <Navbar></Navbar>
            <div className='main'>
                <Sidebar></Sidebar>
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
                                    <div className='col-md-7'>09:00 - 12:00</div>
                                </div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b><i class="bi bi-house-door"></i> Location</b></div>
                                    <div className='col-md-7 row'>
                                        <div className='col-md-12'>Ftown 1</div>
                                        <div className='col-md-12'>Ftown 2</div>
                                    </div>
                                </div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b><i class="bi bi-person"></i> Trainer</b></div>
                                    <div className='col-md-7 row'>
                                        <div className='col-md-12'><a href='#'>Le Huu Tien</a></div>
                                        <div className='col-md-12'><a href='#'>Pham Van Long</a></div>
                                        <div className='col-md-12'><a href='#'>Le Huu Tien</a></div>
                                        <div className='col-md-12'><a href='#'>Pham Van Long</a></div>
                                    </div>
                                </div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b><i class="bi bi-star"></i> Admin</b></div>
                                    <div className='col-md-7 row'>
                                        <div className='col-md-12'><a href='#'>Le Huu Tien</a></div>
                                        <div className='col-md-12'><a href='#'>Pham Van Long</a></div>
                                    </div>
                                </div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b><i class="bi bi-recycle"></i> FSU</b></div>
                                    <div className='col-md-7 row'>
                                        <div className='col-md-12'>FHM</div>
                                        <div className='col-md-12'>Anhbang@gmail.com.vn</div>
                                    </div>
                                </div>
                                <div className='general__under'></div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b>Created</b></div>
                                    <div className='col-md-7'>26/01/2023 by TanLP</div>
                                </div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b>Review</b></div>
                                    <div className='col-md-7'>26/01/2023 by TanLP</div>
                                </div>
                                <div className='row first__class-general'>
                                    <div className='col-md-5'><b>Approve</b></div>
                                    <div className='col-md-7'>26/01/2023 by TanLP</div>
                                </div>
                            </div>

                            <h6 className='container__first-title' onClick={() => toggle1(1)}><i class="bi bi-star"></i> Attendee</h6>
                            <div className={selected1 === 1 ? 'row attendee__component show' : 'row attendee__component'}>
                                <div className='col-md-4 attendee__first row'>
                                    <div className='col-md-12'>Planned</div>
                                    <div className='col-md-12'>10</div>
                                </div>
                                <div className='col-md-4 attendee__center'>
                                    <div className='col-md-12'>Accepted</div>
                                    <div className='col-md-12'>10</div>
                                </div>
                                <div className='col-md-4 attendee__last'>
                                    <div className='col-md-12'>Actual</div>
                                    <div className='col-md-12'>9</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-1'>
                        </div>
                        <div className='col-md-7 '>
                            <div className='container__first-title'>
                                <p className='container__first-text'><i class="bi bi-calendar"></i> Time frame</p>
                                <p className='container__first-text'>25-Apr-22 to 21-July-22</p>
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
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ClassView