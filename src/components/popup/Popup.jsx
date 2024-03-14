import React from 'react';
import { useRef } from 'react';
import "./popup.css";

const Popup = ({ isOpen, onClose }) => {

    const popupRef = useRef();

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
        }
    };


    return (
        <div className={isOpen ? "popup__overlay" : "popup__overlay hidden"} onClick={handleClickOutside}>
            <div ref={popupRef} className={isOpen ? "popup__container" : "popup__container hidden"}>
                <div className="popup__function">
                    <i className="bi bi-plus-circle"></i> Add training program
                </div>
                <div className="popup__function">
                    <i className="bi bi-pencil"></i> Edit syllabus
                </div>
                <div className="popup__function">
                    <i className="bi bi-copy"></i> Duplicate
                </div>
                <div className="popup__function">
                    <i className="bi bi-trash3"></i> Delete syllabus
                </div>
            </div>
        </div>
    );
};

export default Popup;
