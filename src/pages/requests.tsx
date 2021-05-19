import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableHead, TableRow, TableCell, TextField } from '@material-ui/core';
import { RequestsService } from '../services/requests.service';

interface Request {
    _id: string;
    type: string;
    hours: string;
    specialization: string;
    number: string;
    email: string;
}

interface RequestsState {
    requests: Request[];
}

const Requests = () => {

    const [state, setState] = useState<RequestsState>({
        requests: [],
    });

    useEffect(() => {
        fetchCourses();
    },[])

    const fetchCourses = () => {
        RequestsService.getAll().then(res => {
            setState({ ...state, requests: res.data });
        })
    }

    const deleteCourse = (id: any) => {
        RequestsService.delete(id).then(res => {
            fetchCourses();
        })
    }

    return (
        <StyledRequests>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Тип
                        </TableCell>
                        <TableCell>
                            Часы
                        </TableCell>
                        <TableCell>
                            Специализация
                        </TableCell>
                        <TableCell>
                            Номер
                        </TableCell>
                        <TableCell>
                            Почта
                        </TableCell>
                        <TableCell>
                            Действия
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        state.requests.map((request, index) => (
                            <TableRow key={ index }>
                                <TableCell>
                                    { request.type }
                                </TableCell>
                                <TableCell>
                                    { request.hours }
                                </TableCell>
                                <TableCell>
                                    { request.specialization }
                                </TableCell>
                                <TableCell>
                                    { request.number }
                                </TableCell>
                                <TableCell>
                                    { request.email }
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => deleteCourse(request._id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </StyledRequests>
    );
}

const StyledRequests = styled.div`
    padding: 5% 10%;
`;

export default Requests;