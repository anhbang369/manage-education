import { useState } from "react";

export default function SidebarItems() {
    const [open, setOpen] = useState(false)

    return (
        <div className={open ? "sidebar-item open" : "sidebar-item"}>
            <div className="sidebar-title">
                <span>
                    <i className="bi-house-fill"></i>
                    Home
                </span>
                <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
            </div>
            <div className="sidebar-content">


                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            <i className="bi-house-fill"></i>
                            View Syllabus
                        </span>
                    </div>
                </div>

                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            <i className="bi-house-fill"></i>
                            Create Syllabus
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