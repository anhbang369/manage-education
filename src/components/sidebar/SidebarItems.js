import { useState } from "react";

export default function SidebarItems() {
    const [open, setOpen] = useState(false)

    return (
        <div className={open ? "sidebar-item open" : "sidebar-item"}>
            <div className="sidebar-title">
                <span>
                    <i class="bi bi-house"></i>
                    Home
                </span>
            </div>

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
                            View Syllabus
                        </span>
                    </div>
                </div>

                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            Create Syllabus
                        </span>
                    </div>
                </div>


            </div>

            <div className="sidebar-title">
                <span>
                    <i class="bi bi-easel2"></i>
                    Training program
                </span>
                <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
            </div>
            <div className="sidebar-content">


                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            View program
                        </span>
                    </div>
                </div>

                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            Create program
                        </span>
                    </div>
                </div>


            </div>

            <div className="sidebar-title">
                <span>
                    <i class="bi bi-mortarboard"></i>
                    Class
                </span>
                <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
            </div>
            <div className="sidebar-content">


                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            View class
                        </span>
                    </div>
                </div>

                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            Create class
                        </span>
                    </div>
                </div>


            </div>

            <div className="sidebar-title">
                <span>
                    <i class="bi bi-calendar-check"></i>
                    Calendar
                </span>
            </div>

            <div className="sidebar-title">
                <span>
                    <i class="bi bi-people"></i>
                    User manager
                </span>
                <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
            </div>
            <div className="sidebar-content">


                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            User list
                        </span>
                    </div>
                </div>

            </div>

            <a href="#" className="sidebar-item plain">

                <i className="bi-house-fill"></i>
                Help

            </a>
        </div>

    )
}