import React from 'react';
import "./general.css";

const General = () => {
    return (
        <>
            <div className="general__content">
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

                        <p className='fw-bold'>20</p>
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

                    <p className="mt-2">Trainees PCs nedd to have following software installed & run without any issue.</p>
                    <ul>
                        <li className='ms-9'>Microsoft SQL Server 2017 Express</li>
                        <li className='ms-9'>Microsoft SQL Server 2017 Express</li>
                        <li className='ms-9'>Microsoft SQL Server 2017 Express</li>
                    </ul>
                </div>
            </div>

            <div className="general__details">
                <i class="bi bi-fullscreen"><b><span>Course Objective</span></b></i>
                <p className="fw-normal">
                    This topic is to introduce about C# programming language knowledge; adapt trainees with skills, lessons and practices which is specifically used in the Fsoft projects.
                    In details, after completing the topic, trainees will:
                    - Understand basic concepts of high-level programming languages (keyword, statement, operator, control-of-flow)
                    - Understand and distinguish two concepts: class (Class) and object (Object)
                    -Understand and apply object-oriented programming knowledge to resolve simple problems (Inheritance, Encapsulation, Abstraction, Polymorphism)
                    - Working with some of the existing data structures in C# (List, ArrayList, HashTable, Dictionary)
                    - Know how to control program errors (use try... catch..finally, throw, throws)
                    - Be able to working with concurrency and multi-thread in C#
                    -Be able to working with common classes in ADO.net: SqlConnection, SqlCommand, SqlParameter, SqlDataAdapter, SqlDataReader
                    - Be able to manipulate SQL data from Window Form Application via 4 basic commands: Add, Update, Delete, Select
                    - Know how to design UI screen in Window Form Application
                    Know how to use approciate controls for each field/data type: Textbox, Label, Combobox, Radio, DateTimePicker, NumericUpDown, RichTextBox</p>
            </div>
        </>
    )
}

export default General