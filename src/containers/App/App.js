import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../Home';
import Room from '../Room';
import makeRequest, { createUrl } from '../../utils/request';
import history from '../../utils/history';
import '../../mqtt'; // init mqtt

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
  z-index: 5;
  
  @media screen and (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  font-family: "josefinsans-bold", sans-serif;
  font-size: 28px;
  color: black;
  
  span {
    color: blue;
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: null,
    }
  }

  onCreateRoom = () => {
    makeRequest('post')(createUrl.roomCreate())()
      .then((response) => {
        if (response) {
          this.setState({
            room: response,
          }, () => {
            history.push(`/room/${response.id}`);
          })
        }
      });
  };

  onConnectRoom = (inputValue) => {
    history.push(`/room/${inputValue}`);
  };

  render() {
    return (
      <Router history={history}>
        <AppWrapper>
          <AppHeader>
            <LogoLink to="/">
              <Logo>Screen<span>See</span></Logo>
            </LogoLink>
            <AppHeadRight>
            </AppHeadRight>
          </AppHeader>
          <AppMain>
            <Route
              exact
              path="/"
              render={() =>
                <Home
                  onCreateRoom={this.onCreateRoom}
                  onConnectRoom={this.onConnectRoom}
                />
              }
            />
            <Route exact path="/room/:id" render={(props) => <Room room={this.state.room} id={props.match.params.id} />} />
          </AppMain>
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
