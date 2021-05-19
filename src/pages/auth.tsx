import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

const Auth = ({ setAuthed }: any) => {

    const [state, setState] = useState<any>({
        username: '',
        password: '',
        error: '',
    });

    return (
        <StyledAuth>
            <h2>
                Авторизация
            </h2>
            <TextField
                label='Имя'
                value={ state.username }
                onChange={ (e) => {
                    setState({ ...state, username: e.target.value, error: '' })
                } }
            />
            <TextField
                label='Пароль'
                value={ state.password }
                onChange={ (e) => {
                    setState({ ...state, password: e.target.value, error: '' })
                } }
                type='password'
            />
            <p>
                {state.error}
            </p>
            <Button style={{ backgroundColor: '#0095af', color: 'white' }} onClick={() => {
                if (state.username === 'admin' && state.password === 'admin') {
                    sessionStorage.setItem('token', 'token');
                    setState({ ...state, error: '' });
                    setAuthed();
                } else {
                    setState({ ...state, error: 'Имя пользователя или пароль неправильный' })
                }
            }}>
                Войти
            </Button>
        </StyledAuth>
    );
}

const StyledAuth = styled.div`
    position: absolute;
    width: 500px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #0095af;
    padding: 30px;
    && {
        color: white;
    }
    text-align: center;
    border-radius: 10px;
    input {
        margin-bottom: 5px;
    }
`

export default Auth;