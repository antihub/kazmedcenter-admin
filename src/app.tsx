import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/header';
import Auth from './pages/auth';
import Courses from './pages/courses';
import Requests from './pages/requests';


const App = () => {

    const [authed, setAuthed] = useState(!!sessionStorage.getItem('token'));

    return (
        sessionStorage.getItem('token') ? 
        <StyledApp>
            <Header/>
            <Switch>
                <Route exact path='/' component={ Courses }/>
                <Route path='/requests' component={ Requests }/>
            </Switch>
        </StyledApp>
        :
        <Auth setAuthed={ () => setAuthed(true) }/>
    )
}

const StyledApp = styled.div`
`

export default App;