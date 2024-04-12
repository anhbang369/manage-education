import { useState } from 'react';

export default function SidebarItems() {
    const [open, setOpen] = useState(false)
    const [openProgram, setOpenProgram] = useState(false)
    const [openClass, setOpenClass] = useState(false)
    const [openMana, setOpenMana] = useState(false)

    return (
        <>
            <div className="sidebar-item">
                <div className="sidebar-title">
                    <span>
                        <i class="bi bi-house"></i>
                        Home
                        <a href=""></a>
                    </span>
                </div>
            </div>
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        <i class="bi bi-book"></i>
                        Syllabus
                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">


                    <div className={open ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>

                                <a href="/syllabus" className='text-decoration-none text-nav'>View syllabus</a>
                            </span>
                        </div>
                    </div>

                    <div className={open ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>

                                <a href="/lp" className='text-decoration-none text-nav'>Create Syllabus</a>
                            </span>
                        </div>
                    </div>


                </div>
            </div>

            <div className={openProgram ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        <i class="bi bi-easel2"></i>
                        Training program
                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpenProgram(!openProgram)}></i>
                </div>
                <div className="sidebar-content">


                    <div className={openProgram ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>

                                <a href="/training" className='text-decoration-none text-nav'>View program</a>
                            </span>
                        </div>
                    </div>

                    <div className={openProgram ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>

                                <a href="/create" className='text-decoration-none text-nav'>Create program</a>
                            </span>
                        </div>
                    </div>


                </div>
            </div>

            <div className={openClass ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        <i class="bi bi-mortarboard"></i>
                        Class
                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpenClass(!openClass)}></i>
                </div>
                <div className="sidebar-content">


                    <div className={openClass ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>
                                <a href="/class" className='text-decoration-none text-nav'>View class</a>
                            </span>
                        </div>
                    </div>

                    <div className={openClass ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>
                                <a href="/class-create" className='text-decoration-none text-nav'>Create class</a>

                            </span>
                        </div>
                    </div>


                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title">
                    <span>
                        <i class="bi bi-calendar-check"></i>
                        <a href="/calender" className='text-decoration-none text-nav'>Calendar</a>
                    </span>
                </div>
            </div>

            <div className={openMana ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        <i class="bi bi-people"></i>
                        User manager
                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpenMana(!openMana)}></i>
                </div>
                <div className="sidebar-content">


                    <div className={openMana ? "sidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>
                                <a href="/user" className='text-decoration-none text-nav'>User list</a>
                            </span>
                        </div>
                    </div>
                    <div className={openMana ? "tsidebar-item open" : "sidebar-item"}>
                        <div className="sidebar-title">
                            <span>
                                <a href="/permission" className='text-decoration-none text-nav'>User permission</a>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}