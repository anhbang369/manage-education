import React from 'react';
import "./trainMaterial.css";
import { useState } from 'react';
import { useEffect } from 'react';

const TrainMaterial = ({ property }) => {

    const [importOpen, setImportOpen] = useState(property);

    useEffect(() => {
        setImportOpen(property);
    }, [property]);
    const handleClose = () => {
        setImportOpen(false);
    };

    return (
        <>
            <div style={{ display: importOpen ? 'block' : 'none' }} className="material__container">
                <div className="material__header">
                    <h4 className="material__title">Day 1</h4>
                    <i class="bi bi-x-circle title__icon" onClick={handleClose}></i>
                </div>
                <div className="material__unit">
                    <h4 className="material__info">Unit 5</h4>
                    <h4 className="material__info">.NET Introduction</h4>
                </div>
                <div className="material__content">
                    <p className="material__intro">.NET Introduction</p>
                    <div className='material__fix'>
                        <a href="" className="material__link">.NET Introduction overview.pdf</a>
                        <span>by Jonh Florio on 12/03/2024</span>
                        <div>
                            <i class="bi bi-pencil material__icon"></i>
                            <i class="bi bi-trash3"></i>
                        </div>
                    </div>

                    <div className='material__fix'>
                        <a href="" className="material__link">.NET Introduction overview.pdf</a>
                        <span>by Jonh Florio on 12/03/2024</span>
                        <div>
                            <i class="bi bi-pencil material__icon"></i>
                            <i class="bi bi-trash3"></i>
                        </div>
                    </div>

                    <div className='material__fix'>
                        <a href="" className="material__link">.NET Introduction overview.pdf</a>
                        <span>by Jonh Florio on 12/03/2024</span>
                        <div>
                            <i class="bi bi-pencil material__icon"></i>
                            <i class="bi bi-trash3"></i>
                        </div>
                    </div>


                    <div className='material__fix'>
                        <a href="" className="material__link">.NET Introduction overview.pdf</a>
                        <span>by Jonh Florio on 12/03/2024</span>
                        <div>
                            <i class="bi bi-pencil material__icon"></i>
                            <i class="bi bi-trash3"></i>
                        </div>
                    </div>
                </div>

                <button className="btn__material">Upload new</button>
            </div>

        </>
    )
}

export default TrainMaterial