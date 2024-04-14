import React from 'react'

const fi = () => {
    return (
        <>
            {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                <div className="outline__container">
                    <div className="outline__content">
                        <div className="wrapper">
                            <div className='accordion'>
                                {item.syllabusDays.map((itemDay, i) => (
                                    <div className='item'>
                                        <div className='title' onClick={() => toggle(i)}>
                                            <h6 className='outline__days'>{itemDay.dayNo}</h6>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default fi