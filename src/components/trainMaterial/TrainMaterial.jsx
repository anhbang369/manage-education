import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const TrainMaterial = ({ property, syllabusData }) => {

    const [importOpen, setImportOpen] = useState(property);
    const dataArray = Array.isArray(syllabusData) ? syllabusData : [syllabusData];

    useEffect(() => {
        setImportOpen(property);
    }, [property]);
    const handleClose = () => {
        setImportOpen(false);
    };

    console.log("This is data in UI" + dataArray)

    return (
        <>
            {syllabusData && Array.isArray(syllabusData) && syllabusData.map((item) => (
                <div>
                    {
                        item.syllabusDays && Array.isArray(item.syllabusDays) && item.syllabusDays.map((itemDay, i) => (
                            <div style={{ display: importOpen ? 'block' : 'none' }} className="material__container">
                                <div className="material__header">
                                    <h5 className="material__title">Day {itemDay.dayNo}</h5>
                                    <i class="bi bi-x-circle title__icon" onClick={handleClose}></i>
                                </div>
                                {itemDay.syllabusUnits && Array.isArray(itemDay.syllabusUnits) && itemDay.syllabusUnits.map((itemUnit, index) => (
                                    <div>
                                        <div className="material__unit">
                                            <h5 className="material__info">Unit {itemUnit.unitNo}</h5>
                                            <h5 className="material__info">{itemUnit.name}</h5>
                                        </div>
                                        <div className="material__content">
                                            <p className="material__intro">{itemUnit.name}</p>
                                            {itemUnit.syllabusUnitChapters && Array.isArray(itemUnit.syllabusUnitChapters) && itemUnit.syllabusUnitChapters.map((itemChapter, idx) => (
                                                <div>
                                                    {
                                                        itemChapter.materials && Array.isArray(itemChapter.materials) && itemChapter.materials.map((material, idxm) => (
                                                            <div className='material__fix'>
                                                                <a href="" className="material__link">{material.name}</a>
                                                                <span>by {material.createdBy} on {material.createdDate}</span>
                                                                <div>
                                                                    <i class="bi bi-pencil material__icon"></i>
                                                                    <i class="bi bi-trash3"></i>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <button className="btn__material">Upload new</button>
                            </div>
                        ))
                    }
                </div>
            ))}
        </>
    )
}

export default TrainMaterial