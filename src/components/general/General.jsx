import React from 'react';
import "./general.css";

const General = ({ syllabusData }) => {
    return (
        <>
            {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                <div className="d-flex justify-content-around mt-2 box-shadow4">
                    <div className="general__technical">
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex'>
                                <i class="bi bi-star"></i>
                                <p className="ms-2 fw-bold">Level</p>
                            </div>
                            <p className='fw-bold'>All levels</p>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <div className='d-flex'>
                                <i class="bi bi-people-fill"></i>
                                <p className="ms-2 fw-bold">Attendee number</p>
                            </div>

                            <p className='fw-bold'>{item.attendeeNumber}</p>
                        </div>

                        <div className='d-flex justify-content-md-between mt-2'>
                            <div className='d-flex'>
                                <i class="bi bi-shield-check"></i>
                                <p className="ms-2 fw-bold">Output standard</p>
                            </div>

                            <div className="d-flex">
                                <p className="text-white bg-core rounded me-1 p-1">F78P</p>
                                <p className="text-white bg-core rounded me-1 p-1">F78P</p>
                                <p className="text-white bg-core rounded me-1 p-1">F78P</p>
                            </div>
                        </div>
                    </div>
                    <div className="general__technical">
                        <i class="bi bi-gear"> <b><span>Technical Requirements</span></b></i>

                        <div className='mt-2 fs-14'>
                            {item.technicalRequirement}
                        </div>
                    </div>
                </div>
            ))}

            {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                <div className="general__details">
                    <i class="bi bi-fullscreen"><b><span>Course Objective</span></b></i>
                    <div className="fw-normal fs-14">
                        {item.technicalRequirement}
                    </div>
                </div>
            ))}
        </>
    )
}

export default General