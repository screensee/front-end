import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'
import ChatIcon from '../../assets/dialogue.svg';
import UserIcon from "../../components/UserIcon";

const ChatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: calc(50% + 40px);
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

const MessagesWrap = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 10px 10px 0;
  display: flex;
  flex-direction: column;
`;

const SingleMessage = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
  flex-shrink: 0;
`;

const Message = styled.div`
  color: black;
  text-align: left;
  margin-left: 10px;
  margin-top: 3px;
`;

const InputWrap = styled.textarea`
  width: 100%;
  border: 0;
  border-top: 2px solid black;
  height: 70px;
  outline: none;
  padding: 5px 7px;
  resize: none;
  font-family: "josefinsans-semibold", sans-serif;
`;

class Chat extends Component {
  static propTypes = {
    onSendMessage: PropTypes.function.isRequired,
    messages: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      expanded: false,
    }
  }

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  onSendMessage = () => {
    this.props.onSendMessage();
  }

  renderMessages = () => {
    const { messages } = this.props;
    return messages.map((mess) => (
      <SingleMessage key={mess.timestamp}>
        <UserIcon fromChat name={mess.author} />
        <Message>{mess.text}</Message>
      </SingleMessage>
    ))
  };

  render() {
    return (
      <ChatWrapper expanded={this.state.expanded}>
        <VisibleIcon onClick={this.toggleExpand}>
          <img src={ChatIcon} alt="" />
        </VisibleIcon>
        <MessagesWrap>
          {this.renderMessages()}
        </MessagesWrap>
        <InputWrap />
      </ChatWrapper>
    );
  }
}

export default Chat;
