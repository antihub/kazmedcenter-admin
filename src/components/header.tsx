import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => (
    <StyledHeader>
        <h1>
            KazMedCenter
        </h1>
        <Link to='/'>Курсы</Link>
        <Link to='/requests'>Заявки</Link>
    </StyledHeader>
);

const StyledHeader = styled.div`
    background-color: #0095af;
    color: #fff;
    padding: 3% 10%;
    h1 {
        margin: 0;
        margin-bottom: 20px;
    }
    a {
        color: white;
        padding-right: 15px;
    }
`;

export default Header;