import React from 'react';
import "./general.css";

const General = () => {
    return (
        <>
            <div className="general__content">
                <div className="general__technical">
                    <div className='level__content'>
                        <div className='content__icon'>
                            <i class="bi bi-star"></i>
                            <p className="level__title">Level</p>
                        </div>
                        <p className="level__info">All levels</p>
                    </div>

                    <div className='level__content'>
                        <div className='content__icon'>
                            <i class="bi bi-people-fill"></i>
                            <p className="level__title">Attendee number</p>
                        </div>

                        <p className="level__info">20</p>
                    </div>

                    <div className='level__content'>
                        <div className='content__icon'>
                            <i class="bi bi-shield-check"></i>
                            <p className="level__title">Output standard</p>
                        </div>

                        <div className="level__output">
                            <p className="output__info">F78P</p>
                            <p className="output__info">F78P</p>
                            <p className="output__info">F78P</p>
                        </div>
                    </div>
                </div>
                <div className="general__technical">
                    <i class="bi bi-gear"> <b><span className="technical__title">Technical Requirements</span></b></i>

                    <p className="technical__info">Trainees PCs nedd to have following software installed & run without any issue.</p>
                    <ul>
                        <li className='technical__list'>Microsoft SQL Server 2017 Express</li>
                        <li className='technical__list'>Microsoft SQL Server 2017 Express</li>
                        <li className='technical__list'>Microsoft SQL Server 2017 Express</li>
                    </ul>
                </div>
            </div>

            <div className="general__details">
                <i class="bi bi-fullscreen"><b><span>Course Objective</span></b></i>
                <p className="details__info">
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