import React from 'react';
import "./navbar.css";
import Image from "../assets/cat.jpg"

const Navbar = () => {
    return (
        <nav className="nav">
            <div className='nav__container'>
                <div>
                    <ul className='nav__list'>
                        <li className='nav__title'>Logo</li>
                    </ul>
                </div>
                <div>
                    <ul className='nav__list'>
                        <li className='nav__title'>Logo second</li>
                        <li className='nav__title'>
                            <div className="nav__logout">
                                <img src={Image} alt="" className="nav__img" />
                                <div className="nav_content">
                                    <h4 className="nav__name">Anh Bang</h4><br />
                                    <a href="//#endregion" className="nav__func">Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar