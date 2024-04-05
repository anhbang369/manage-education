import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./actionMenu.css";

const ActionMenu = () => {
    return (
        <>
            <div className="mb-2">
                {['start'].map(
                    (direction) => (
                        <DropdownButton
                            key={direction}
                            id={`dropdown-button-drop-${direction}`}
                            drop={direction}
                            variant="secondary"
                            title={<i className="bi bi-three-dots"></i>}
                            toggle={false}
                        >
                            <Dropdown.Item eventKey="1"><i className="bi bi-plus-circle"></i> Add training program</Dropdown.Item>
                            <Dropdown.Item eventKey="2"><i className="bi bi-pencil"></i> Edit syllabus</Dropdown.Item>
                            <Dropdown.Item eventKey="3"><i className="bi bi-copy"></i> Duplicate</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4"><i className="bi bi-trash3"></i> Delete syllabus</Dropdown.Item>
                        </DropdownButton>
                    ),
                )}
            </div>
        </>
    )
}

export default ActionMenu