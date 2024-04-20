import * as React from 'react';
import "./outlineCreate.css";
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { getDeliveryType } from "../../services/DeliveryTypeService";
import { getOutputStandard } from "../../services/OutputStandardService";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

export const data = [
    ["Task", "Hours per Day"],
    ["Assignment/Lab", 54],
    ["Concept/Lecture", 29],
    ["Guide/Review", 9],
    ["Test/Quiz", 1],
    ["Exam", 6],
];

export const options = {
    legend: {
        position: "bottom",
    },
    pieSliceText: "label",
    pieStartAngle: 100,
};

//toggle
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const OutlineCreate = () => {
    const [openHour, setOpenHour] = React.useState(false);
    const handleOpenHour = () => setOpenHour(true);
    const handleCloseHour = () => setOpenHour(false);

    const [formData, setFormData] = useState({
        title: '',
        standard: '',
        duration: '',
        type: '',
        online: false
    });


    const [selected, setSelected] = useState(null)
    const [importOpen, setImportOpen] = useState(false);
    //get list
    const [output, setOutput] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const [syllabusDays, setSyllabusDays] = useState([]);
    const [unitName, setUnitName] = useState([]);



    const [dayFormData, setDayFormData] = useState({
        dayNo: 1,
        status: 'AVAILABLE'
    });
    //popup material
    const [open, setOpen] = useState({});
    const handleOpenModal = (index) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            [index]: true,
        }));
    };

    const handleCloseModal = (index) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            [index]: false,
        }));
    };

    const handleAddDay = () => {
        const maxDayNo = syllabusDays.reduce((max, day) => Math.max(max, day.dayNo), 0);
        const newUnit = {
            name: "Default Unit", // Tên của unit mặc định
            unitNo: 1, // Số thứ tự của unit mặc định, ở đây là 1
            duration: 0, // Thời lượng của unit mặc định, ở đây là 0
            syllabusUnitChapters: [] // Các chương của unit mặc định, ở đây là một mảng trống
        };

        const newDay = {
            dayNo: maxDayNo + 1,
            status: dayFormData.status,
            syllabusUnits: [newUnit] // Thêm unit mặc định vào mảng syllabusUnits của ngày mới
        };

        setSyllabusDays(prevSyllabusDays => [...prevSyllabusDays, newDay]);

        // Tăng số ngày lên 1 để chuẩn bị cho ngày tiếp theo
        setDayFormData(prevDayFormData => ({
            ...prevDayFormData,
            dayNo: prevDayFormData.dayNo + 1
        }));
    };

    //delete day
    const handleDeleteDay = (dayIndex) => {
        // Xóa ngày cần xóa khỏi mảng ngày
        const updatedSyllabusDays = syllabusDays.filter((_, index) => index !== dayIndex);

        // Cập nhật lại số ngày của các ngày sau ngày bị xóa để dồn chúng lên
        updatedSyllabusDays.forEach((day, index) => {
            day.dayNo = index + 1; // Cập nhật số ngày
        });

        // Cập nhật lại mảng ngày sau khi dồn
        setSyllabusDays(updatedSyllabusDays);
    };




    //calulate mins
    const calculateTotalDurationOfDay = (day) => {
        let totalDuration = 0;
        day.syllabusUnits.forEach((unit) => {
            unit.syllabusUnitChapters.forEach((chapter) => {
                totalDuration += parseInt(chapter.duration);
            });
        });
        return totalDuration;
    };

    console.log("days: " + JSON.stringify(syllabusDays))

    const handleAddUnit = (dayIndex) => {
        const newUnit = {
            name: unitName[dayIndex],
            unitNo: (syllabusDays[dayIndex]?.syllabusUnits?.length || 0) + 1,
            duration: 0,
            syllabusUnitChapters: []
        };

        setSyllabusDays(prevSyllabusDays => {
            const updatedSyllabusDays = [...prevSyllabusDays];
            updatedSyllabusDays[dayIndex].syllabusUnits.push(newUnit);
            return updatedSyllabusDays;
        });
    };
    const handleUnitNameChange = (e, dayIndex) => {
        const updatedUnitName = [...unitName];
        updatedUnitName[dayIndex] = e.target.value;
        setUnitName(updatedUnitName);
    };



    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleAddChapter = (dayIndex, unitIndex) => {
        const newChapter = {
            title: formData.title,
            standard: formData.standard,
            duration: formData.duration,
            type: formData.type,
            online: formData.online,
            materials: []
        };

        setSyllabusDays(prevSyllabusDays => {
            const updatedSyllabusDays = [...prevSyllabusDays];
            const unitToUpdate = updatedSyllabusDays[dayIndex]?.syllabusUnits[unitIndex];
            if (unitToUpdate) {
                unitToUpdate.syllabusUnitChapters.push(newChapter);
            }
            return updatedSyllabusDays;
        });
    };

    const [chapterMaterials, setChapterMaterials] = useState([{ name: '', url: '' }]);


    const handleAddMaterial = (dayIndex, unitIndex, chapterIndex) => {
        const newName = chapterMaterials[chapterIndex]?.name || '';
        const newUrl = chapterMaterials[chapterIndex]?.url || '';

        if (newName.trim() === '' || newUrl.trim() === '') {
            console.log('Vui lòng điền đầy đủ thông tin vật liệu.');
            return;
        }

        const newMaterial = { name: newName, url: newUrl };

        setSyllabusDays(prevSyllabusDays => {
            const updatedSyllabusDays = [...prevSyllabusDays];
            const unitToUpdate = updatedSyllabusDays[dayIndex]?.syllabusUnits[unitIndex];
            if (unitToUpdate) {
                const chapterToUpdate = unitToUpdate.syllabusUnitChapters[chapterIndex];
                if (chapterToUpdate) {
                    chapterToUpdate.materials.push(newMaterial);
                }
            }
            return updatedSyllabusDays;
        });

        const updatedMaterials = [...chapterMaterials];
        updatedMaterials[chapterIndex] = { name: '', url: '' };
        setChapterMaterials(updatedMaterials);
    };

    const handleMaterialChange = (index, field, value) => {
        const updatedMaterials = [...chapterMaterials];
        if (updatedMaterials[index]) {
            updatedMaterials[index][field] = value;
            setChapterMaterials(updatedMaterials);
        }
    };


    const handleDeleteMaterial = (dayIndex, unitIndex, chapterIndex, materialIndex) => {
        setSyllabusDays(prevSyllabusDays => {
            const updatedSyllabusDays = [...prevSyllabusDays];
            const unitToUpdate = updatedSyllabusDays[dayIndex]?.syllabusUnits[unitIndex];
            if (unitToUpdate) {
                const chapterToUpdate = unitToUpdate.syllabusUnitChapters[chapterIndex];
                if (chapterToUpdate) {
                    chapterToUpdate.materials.splice(materialIndex, 1);
                }
            }
            return updatedSyllabusDays;
        });
    };





    // const handleUnitNameChange = (dayIndex, value) => {
    //     const updatedUnitNames = [...unitName];
    //     updatedUnitNames[dayIndex] = value;
    //     setUnitName(updatedUnitNames);
    // };
    // const [syllabusDays, setSyllabusDays] = useState([]);

    // const handleAddDay = () => {
    //     const newDay = {
    //         dayNo: 0,
    //         status: 'AVAILABLE',
    //         syllabusUnits: []
    //     };
    //     setSyllabusDays(prevSyllabusDays => [...prevSyllabusDays, newDay]);
    // };

    // const handleAddUnit = (dayIndex) => {
    //     const newUnit = {
    //         name: 'string',
    //         unitNo: 0,
    //         duration: 0,
    //         syllabusUnitChapters: []
    //     };
    //     setSyllabusDays(prevSyllabusDays => {
    //         const updatedSyllabusDays = [...prevSyllabusDays];
    //         updatedSyllabusDays[dayIndex].syllabusUnits.push(newUnit);
    //         return updatedSyllabusDays;
    //     });
    // };

    // const handleAddChapter = (dayIndex, unitIndex) => {
    //     const newChapter = {
    //         name: 'string',
    //         duration: 0,
    //         outputStandardId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //         deliveryTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //         materials: null,
    //         online: true
    //     };
    //     setSyllabusDays(prevSyllabusDays => {
    //         const updatedSyllabusDays = [...prevSyllabusDays];
    //         updatedSyllabusDays[dayIndex].syllabusUnits[unitIndex].syllabusUnitChapters.push(newChapter);
    //         return updatedSyllabusDays;
    //     });
    // };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOutputStandard();
                setOutput(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDeliveryType();
                setDelivery(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    // const toggle = (i) => {
    //     if (selected === i) {
    //         return setSelected(null)
    //     }

    //     setSelected(i)
    // }

    // const [selectedMore, setSelectedMore] = useState(null)
    // const toggles = (i) => {
    //     if (selectedMore === i) {
    //         return setSelectedMore(null)
    //     }

    //     setSelectedMore(i)
    // }


    // const handleAddItem = () => {
    //     const newItem = {
    //         title: formData.title,
    //         standard: formData.standard,
    //         duration: formData.duration,
    //         type: formData.type,
    //         online: formData.online
    //     };

    // setFormData(prevDetails => {
    //     if (Array.isArray(prevDetails)) {
    //         return [...newItem, newItem];
    //     } else {
    //         console.error('prevDetails is not an array:', prevDetails);
    //         return [newItem]; // Trả về prevDetails nếu không phải là một mảng
    //     }
    // });
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         haha: [...(prevFormData.list || []), newItem]
    //     }));

    // };


    // console.log("this is list syllabus:" + JSON.stringify(formData));


    return (
        <>
            <div className="outline__container">
                <div className="outline__content">
                    <div className="wrapper">
                        <div className='accordion'>
                            {syllabusDays.map((day, idxDay) => (
                                <div className='item'>
                                    <div>
                                        <div className='title'>
                                            <h6 className='outline__days'>{day.dayNo} <i className="bi bi-dash-circle red pointer" onClick={() => handleDeleteDay(idxDay)}></i>  {calculateTotalDurationOfDay(day) > 8 * 60 && <i className="bi bi-exclamation-triangle red" onClick={handleOpenHour}></i>}</h6>
                                        </div>

                                        {day.syllabusUnits.map((unit, idxUnit) => (
                                            <div className='content show'>
                                                <div className="unit" >
                                                    <div className="unit__component">
                                                        <div className='d-flex'>
                                                            <p className='fs-14'>Unit</p>
                                                            <div className='ms-4'>
                                                                <p className='fs-14'>{unit.unitNo}</p>
                                                                <span className="fs-14">{unit.duration} hours</span>
                                                            </div>
                                                            <div>
                                                                <i class="bi bi-pencil p-2 bg-core rounded ms-3 text-white"></i>
                                                            </div>

                                                        </div>
                                                        <i className='bi bi-caret-down-fill'></i>
                                                    </div>

                                                    {/* // <Box sx={{ flexGrow: 1 }} className={selectedMore === i ? 'unit__details show' : 'unit__details'} key={idx}> */}
                                                    {unit.syllabusUnitChapters.map((chapter, idxChapter) => (
                                                        <Box sx={{ flexGrow: 1 }} className='unit__details show' >
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={5}>
                                                                    {chapter.title}
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <div className="bg-core rounded text-white w-50">{chapter.standard}</div>
                                                                </Grid>
                                                                <Grid item xs={1} cl>
                                                                    {chapter.duration} mins
                                                                </Grid>
                                                                <Grid item xs={1} className='ms-3 me-3'>
                                                                    <p>
                                                                        {chapter.online ? <p className='details__onl'>Online</p> : <p className='text-white bg-core rounded p-1 fw-normal'>Offline</p>}
                                                                    </p>
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    {/* {detail.type.name === 'Concept/Lecture' && <i class="bi bi-person-plus"></i>}
                                                                        {detail.type.name === 'Assignment/Lab' && <i class="bi bi-bookmark-check"></i>}
                                                                        {detail.type.name === 'Test/Quiz' && <i class="bi bi-card-checklist"></i>}
                                                                        {detail.type.name === 'Exam' && <i class="bi bi-journal-bookmark-fill"></i>}
                                                                        {detail.type.name === 'Guide/Review' && <i class="bi bi-hand-thumbs-up"></i>}
                                                                        {detail.type.name === 'Seminar/Workshop' && <i class="bi bi-person-workspace"></i>}
                                                                        {detail.type.name === 'Class Meeting' && <i class="bi bi-people"></i>}
                                                                        {detail.type.name === 'Tour/Outdoor' && <i class="bi bi-globe-central-south-asia"></i>} */}
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <React.Fragment>
                                                                        <Button
                                                                            backgroundColor="bg-core"
                                                                            className="border border-0 text-white rounded me-3 px-1 bg-core"
                                                                            onClick={() => handleOpenModal(idxChapter)}
                                                                        >
                                                                            <i class="bi bi-folder2-open"></i>
                                                                        </Button>
                                                                        <Modal open={open[idxChapter] || false} onClose={() => handleCloseModal(idxChapter)}>
                                                                            <ModalDialog className='w-50'>
                                                                                <div className="border border-black rounded-top">
                                                                                    <h5 className="bg-core rounded-top text-white p-2">Matreial</h5>
                                                                                    <div>
                                                                                        {/* <div className="w-100 d-flex my-2">
                                                                                                                        <h5 className="ms-2 fs-18">Unit {unit.unitNo}</h5>
                                                                                                                        <h5 className="ms-2 fs-18">{unit.name}</h5>
                                                                                                                    </div> */}
                                                                                        <div className="w-100">

                                                                                            <div>
                                                                                                {
                                                                                                    chapter.materials.map((material, idxMaterial) => (
                                                                                                        <div className='d-flex justify-content-center' key={idxMaterial}>
                                                                                                            <div className='bg-chapter d-flex w-98 row rounded'>
                                                                                                                <a href="" className="material__link col-md-4 fs-14">{material.name}</a>
                                                                                                                <span className='col-md-6 fs-14'>{material.url}</span>
                                                                                                                <div className='col-md-2 row'>
                                                                                                                    <i class="bi bi-pencil col-md-6 text-primary"></i>
                                                                                                                    <i className="bi bi-trash3 col-md-6 text-primary pointer" onClick={() => handleDeleteMaterial(idxDay, idxUnit, idxChapter, idxMaterial)}></i>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    ))}
                                                                                                <div className='ms-2 bg-chapter d-flex w-98 row rounded'>
                                                                                                    <input
                                                                                                        type='text'
                                                                                                        className='rounded col-md-4'
                                                                                                        value={chapterMaterials[idxChapter]?.name || ''} // Sử dụng giá trị từ chapterMaterials
                                                                                                        onChange={(e) => handleMaterialChange(idxChapter, 'name', e.target.value)}
                                                                                                        placeholder="Enter name" // Thêm placeholder cho phần nhập liệu
                                                                                                    />
                                                                                                    <p className='col-md-1'></p>
                                                                                                    <input
                                                                                                        type='text'
                                                                                                        className='rounded col-md-5'
                                                                                                        value={chapterMaterials[idxChapter]?.url || ''} // Sử dụng giá trị từ chapterMaterials
                                                                                                        onChange={(e) => handleMaterialChange(idxChapter, 'url', e.target.value)}
                                                                                                        placeholder="Enter URL" // Thêm placeholder cho phần nhập liệu
                                                                                                    />
                                                                                                    <div className='col-md-2 row'>
                                                                                                        <button onClick={() => handleAddMaterial(idxDay, idxUnit, idxChapter)}>
                                                                                                            <i className="bi bi-cloud-plus col-md-4 text-primary"></i> Add
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>


                                                                                                {/* ))
                                                                                            } */}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='w-100 d-flex justify-content-center'>
                                                                                        <button className="bg-core text-white rounded border-0 my-2 p-1">Upload new</button>
                                                                                    </div>
                                                                                </div>
                                                                            </ModalDialog>
                                                                        </Modal>
                                                                    </React.Fragment>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ))}
                                                    {/* <Box sx={{ flexGrow: 1 }} className={selectedMore === i ? 'unit__details show' : 'unit__details'}></Box> */}
                                                    <Box sx={{ flexGrow: 1 }} className='unit__details show'>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={5}>
                                                                <input className='w-80 rounded' type="text" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <select
                                                                    className='w-75'
                                                                    name="cars"
                                                                    id="cars"
                                                                    value={formData.standard} onChange={(e) => handleChange('standard', e.target.value)}

                                                                >
                                                                    {output ? (
                                                                        output.map((item, index) => (
                                                                            <option key={index} value={item.id}>{item.name}</option>
                                                                        ))
                                                                    ) : (
                                                                        <option>Loading...</option>
                                                                    )}
                                                                </select>

                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <input className='rounded w-80' type="number" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} />
                                                            </Grid>
                                                            <Grid item xs={1} className='ms-3 me-3'>
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={<Android12Switch checked={!!formData.online}
                                                                            onChange={(e) => setFormData({ ...formData, online: e.target.checked })} />}
                                                                        label=""
                                                                    />


                                                                </FormGroup>


                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <select
                                                                    className='w-130'
                                                                    name="cars"
                                                                    id="cars"
                                                                    // value={formData.type ? formData.type.id : ''}
                                                                    // onChange={(e) => {
                                                                    //     const selectedType = delivery.find(item => item.id === e.target.value);
                                                                    //     setFormData({ ...formData, type: selectedType });
                                                                    // }}
                                                                    value={formData.type} onChange={(e) => handleChange('type', e.target.value)}
                                                                >
                                                                    {delivery ? (
                                                                        delivery.map((item, index) => (
                                                                            <option key={index} value={item.id}>{item.name}</option>
                                                                        ))
                                                                    ) : (
                                                                        <option>Loading...</option>
                                                                    )}
                                                                </select>

                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                {/* <i className="bi bi-folder2-open" onClick={() => setImportOpen(true)}></i> */}

                                                            </Grid>

                                                        </Grid>
                                                    </Box>
                                                    <button className='border-0 rounded text-white bg-core py-1 px-2 mb-2 ms-5' onClick={() => handleAddChapter(idxDay, idxUnit)} ><i class="bi bi-plus-circle"></i></button>

                                                </div>

                                                <div className="unit" >
                                                    <div className="unit__component">
                                                        <div className='unit__com'>
                                                            <p className="unit__number">Unit 7</p>
                                                            <div className='title__div'>
                                                                <p className="unit__title-create">Unit name</p>
                                                                <span className="unit__time">
                                                                    <input type="text" class="form-control h-50 w-100 p-0 mx-3 my-1" placeholder='Type unit name' aria-describedby="basic-addon1" value={unitName[idxDay]} onChange={(e) => handleUnitNameChange(e, idxDay)} />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <button className="bg-day border-0 rounded p-1 text-white mt-4 mb-1 ms-5" onClick={() => handleAddUnit(idxDay)}>Create</button>
                                                            </div>

                                                        </div>
                                                        {/* <i className={selectedMore === idxDay ? 'bi bi-caret-down-fill' : 'bi bi-caret-left-fill'}></i> */}
                                                    </div>
                                                </div>

                                                <div>
                                                    <button className="border-0 p-1 rounded ms-3 mt-1 bg-day text-white mb-3"><i class="bi bi-plus-circle"></i> Add unit</button>
                                                </div>
                                            </div>
                                        ))}

                                    </div>


                                </div>
                            ))}

                            <div>
                                <input
                                    type="text"
                                    value={dayFormData.dayNo}
                                    onChange={(e) => setDayFormData({ ...dayFormData, dayNo: e.target.value })}
                                />
                                <button className="text-white bg-core p-1 border-0 rounded mt-4 ms-3" onClick={handleAddDay}><i class="bi bi-plus-circle"></i> Add day</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-25 h-75 border me-15 rounded-top">
                    <h6 className="p-1 bg-core text-white text-center rounded-top">Time allocation</h6>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"99%"}
                        height={"90%"}
                    />
                </div>
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4 ms-3">Previous</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-transparent border-0 text-white rounded p-2 my-4"><a href="#" className="text-danger fw-bold p-2">Cancal</a></button>
                    </Grid>
                    <Grid item xs={2}>
                        <button className="bg-dark-subtle border-0 text-white rounded p-2 my-4">Save as draft</button>
                    </Grid>
                    <Grid item xs={1}>
                        <button className="bg-secondary border-0 text-white rounded p-2 my-4">Next</button>
                    </Grid>
                </Grid>
            </Box>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openHour}
                onClose={handleCloseHour}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openHour}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <div className="d-flex">
                                <i className="bi bi-exclamation-triangle red"></i><h5 className='text-primary fw-bold mt-1 ms-2'>Learning hours</h5>
                            </div>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <p>Learning hours of a day cannot exceed 8 hours.</p>
                            <p>Save and modify later?</p>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

// const data1 = [
//     {
//         day: "Day 1",
//         units: [
//             {
//                 title: ".NET Introduction",
//                 duration: "3hrs",
//                 details: [
//                     {
//                         title: ".NET Introduction",
//                         standard: "SD4H",
//                         duration: "30mins",
//                         type: "Online",
//                         icons: ["bi bi-person-lines-fill", "bi bi-folder2-open"]
//                     },
//                     {
//                         title: ".NET Introduction",
//                         standard: "SD4H",
//                         duration: "30mins",
//                         type: "Online",
//                         icons: ["bi bi-person-lines-fill", "bi bi-folder2-open"]
//                     },
//                     {
//                         title: ".NET Introduction",
//                         standard: "SD4H",
//                         duration: "30mins",
//                         type: "Online",
//                         icons: ["bi bi-person-lines-fill", "bi bi-folder2-open"]
//                     },
//                 ]
//             },
//             // Thêm unit thứ hai của ngày 1 ở đây
//         ]
//     },
//     // Thêm các ngày và unit khác ở đây
// ];

export default OutlineCreate