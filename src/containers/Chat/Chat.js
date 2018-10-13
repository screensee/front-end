import React, { Component } from 'react';
import styled, { css } from 'styled-components'
import ChatIcon from '../../assets/dialogue.svg';

const ChatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  right: 0;
  height: 350px;
  width: 250px;
  background-color: white;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  z-index: 2;
  transform: translate(100%, -50%);
  transition: 215ms ease-out;
  box-shadow: 0 0 20px 2px rgba(0,0,0,0);
  
  ${(props) => props.expanded && css`
    box-shadow: 0 0 20px 2px rgba(0,0,0,.45);
    transform: translate(0, -50%);
    transition: 135ms ease-in;
  `};
`;

const VisibleIcon = styled.div`
  position: absolute;
  left: -64px;
  top: 50%;
  transform: translateY(-50%);
  background-color: black;
  padding: 5px 5px 1px;
  cursor: pointer;
  box-shadow: -2px 0 20px 2px rgba(0,0,0,.45);

  img {
    width: 50px;
    cursor: pointer;
  }
`;

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    }
  }

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  render() {
    return (
      <ChatWrapper expanded={this.state.expanded}>
        <VisibleIcon onClick={this.toggleExpand}>
          <img src={ChatIcon} alt=""/>
        </VisibleIcon>
      </ChatWrapper>
    );
  }
}

export default Chat;
