import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableHead, TableRow, TableCell, TextField } from '@material-ui/core';
import { CourseService } from '../services/courses.service';
import { Delete } from '@material-ui/icons';

interface Course {
    _id: string;
    name: string;
    price: string;
    description: string;
    target: string;
    loops: Array<String>;
}

interface CoursesState {
    openModal: boolean;
    course: Course;
    courses: Course[];
}

const newCourse = {
    _id: 'new',
    name: '',
    price: '',
    description: '',
    target: '',
    loops: [''],
}

const Courses = () => {

    const [state, setState] = useState<CoursesState>({
        openModal: false,
        course: { ...newCourse },
        courses: [],
    });

    useEffect(() => {
        fetchCourses();
    },[])

    const fetchCourses = () => {
        CourseService.getAll().then(res => {
            setState({ ...state, courses: res.data });
        })
    }

    const deleteCourse = (id: any) => {
        CourseService.delete(id).then(res => {
            fetchCourses();
        })
    }

    const handleCourseChange = (e: React.ChangeEvent<any>) => {
        const { course }: any = { ...state };
        course[e.target.name] = e.target.value;
        setState({ ...state, course });
    }

    const handleSave = () => {
        const { course }: any = state;
        course.loops = course.loops.filter((loop: any) => loop !== '');
        CourseService.post(course).then(res => {
            state.openModal = false;
            fetchCourses();
        });
    }

    return (
        <StyledCourses>
            <Dialog open={ state.openModal } onClose={ () => setState({ ...state, openModal: false }) }>
                <DialogTitle>
                    Новый курс
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        id="course-name" 
                        label="Название"
                        value={ state.course.name }
                        inputProps={{ name: 'name' }}
                        onChange={(e) => handleCourseChange(e)}
                    />
                    <TextField
                        id="course-price" 
                        label="Цена"
                        value={ state.course.price }
                        inputProps={{ name: 'price' }}
                        onChange={(e) => handleCourseChange(e)}
                    />
                    <TextField
                        multiline
                        id="course-description" 
                        label="Описание"
                        value={ state.course.description }
                        inputProps={{ name: 'description' }}
                        onChange={(e) => handleCourseChange(e)}
                    />
                    <TextField
                        multiline
                        id="course-target" 
                        label="Цель и задачи"
                        value={ state.course.target }
                        inputProps={{ name: 'target' }}
                        onChange={(e) => handleCourseChange(e)}
                    />
                    <h6>
                        Циклы
                    </h6>
                    {
                        state.course.loops.map((loop, index) => {
                            let loops = state.course.loops
                            return (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id={`course-loop-${index}`}
                                        label={ `Цикл №${index+1}` }
                                        value={ state.course.loops[index] }
                                        onChange={(e) => {
                                            loops[index] = e.target.value;
                                            setState({ ...state, course: { ...state.course, loops } });
                                        }}
                                    />
                                    <Delete onClick={ () => {
                                        loops.splice(index, 1);
                                        setState({ ...state, course: { ...state.course, loops } });
                                    } }/>
                                </div>
                            )
                        })
                    }
                    <Button onClick={() => setState({ ...state, course: { ...state.course, loops: [...state.course.loops, ''] } })}>
                        Добавить цикл
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={() => handleSave()}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
            <Button 
                style={{ backgroundColor: '#0095af', color: 'white' }}
                onClick={() => {
                    setState({ ...state, openModal: true, course: { ...newCourse } })
                }}
            >
                Создать курс
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Название
                        </TableCell>
                        <TableCell>
                            Действия
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        state.courses.map((course, index) => (
                            <TableRow key={ index }>
                                <TableCell>
                                    { course.name }
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => {
                                            setState({ ...state, openModal: true, course })
                                        }}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        onClick={() => deleteCourse(course._id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </StyledCourses>
    );
}

const StyledCourses = styled.div`
    padding: 5% 10%;
`;

export default Courses;