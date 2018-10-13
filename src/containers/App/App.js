import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../Home';
import Room from '../Room';
import Button from '../../components/Button';
import styled from 'styled-components';

const AppWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppMain = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const AppHeader = styled.header`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 50px;
  box-shadow: 0 0 20px 3px rgba(0,0,0,.45);
  z-index: 2;
`;

const Logo = styled.div`
  cursor: pointer;
  font-family: "josefinsans-bold", sans-serif;
  font-size: 28px;
  color: black;
  
  span {
    color: #3379fc;
  }
`;

const LogoLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const AppHeadRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-right: 30px;
`;

class App extends Component {
  render() {
    return (
      <Router>
      <AppWrapper>
        <AppHeader>
          <LogoLink to="/">
            <Logo>Screen<span>See</span></Logo>
          </LogoLink>
          <AppHeadRight>
            <StyledLink to="/">
              <Button>Home</Button>
            </StyledLink>
            <Link to="/room">
              <Button>Room</Button>
            </Link>
          </AppHeadRight>
        </AppHeader>
        <AppMain>
          <Route exact path="/" component={Home} />
          <Route exact path="/room" component={Room} />
        </AppMain>
      </AppWrapper>
      </Router>
    );
  }
}

export default App;
