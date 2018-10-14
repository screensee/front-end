import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'
import ChatIcon from '../../assets/dialogue.svg';
import UserIcon from "../../components/UserIcon";
import Button from "../../components/Button";

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
  
  @media screen and (max-width: 768px) {
    transform: translateY(0);
    top: -3px;
  }

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
  width: 100%;
`;

const MessagesArray = styled.div`
  height: 100%;
  width: 100%;
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
  overflow-wrap: break-word;
  width: 170px;
`;

const InputWrap = styled.textarea`
  width: 100%;
  border: 0;
  height: 70px;
  outline: none;
  padding: 5px 7px;
  resize: none;
  font-family: "josefinsans-semibold", sans-serif;
  flex-shrink: 0;
  
  ${(props) => props.isMobile && css`
    width: calc(100% - 50px);
  `};
`;

const FormWrap = styled.form`
  border-top: 2px solid black;
  width: 100%;
  height: 70px;
  display: flex;
  flex-shrink: 0;
`;

const StyledButton = styled(Button)`
    width: 50px;
    height: 70px;
    flex-shrink: 0;
    position: absolute;
    bottom: -2px;
    right: 0;
    border: 0;
    border-left: 2px solid black;
    
    &:after {
      transform: translate(0, 67px);
      height: 70px;
    }
`;

class Chat extends Component {
  static propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      expanded: false,
    };
    this.inputRef = null;
    this.userAgent = navigator.userAgent;

    this.isMobile = Boolean(this.userAgent.match(/Android|iPhone|iPad|Mobile/));
  }

  componentDidUpdate({ messages }) {
    if (this.props.messages !== messages) {
      this.wrapRef.scrollTop = this.arrayRef.offsetHeight;
    }
  }

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  onInputRef = (ref) => {
    this.inputRef = ref;
  };

  assignArrayRef = (ref) => {
    this.arrayRef = ref;
  };

  assignWrapRef = (ref) => {
    this.wrapRef = ref;
  };

  onInputKey = (e) => {
    if (e.key === 'Enter' && this.inputRef.value && !this.isMobile) {
      event.preventDefault();
      this.props.onSendMessage(this.inputRef.value);
    }
  };

  onInputClear = (event) => {
    if (event.key === 'Enter' && !this.isMobile) {
      this.inputRef.value = '';
    }
  };

  submitMessage = (e) => {
    e.preventDefault();
    if (this.inputRef.value) {
      this.props.onSendMessage(this.inputRef.value);
      this.inputRef.value = '';
    }
  };

  renderMessages = () => {
    const { messages } = this.props;
    return (
      <MessagesArray innerRef={this.assignArrayRef}>
        {
          messages.map((mess) => (
            <SingleMessage key={mess.timestamp}>
              <UserIcon fromChat name={mess.author} />
              <Message>{mess.text}</Message>
            </SingleMessage>
          ))
        }
      </MessagesArray>
    )
  };

  render() {
    return (
      <ChatWrapper expanded={this.state.expanded}>
        <VisibleIcon onClick={this.toggleExpand}>
          <img src={ChatIcon} alt="" />
        </VisibleIcon>
        <MessagesWrap innerRef={this.assignWrapRef}>
          {this.renderMessages()}
        </MessagesWrap>
        <FormWrap onSubmit={this.submitMessage}>
          <InputWrap isMobils={this.isMobile} placeholder="Start typing..." innerRef={this.onInputRef} onKeyDown={this.onInputKey} onKeyUp={this.onInputClear} />
          {this.isMobile && <StyledButton type="submit">Send</StyledButton>}
        </FormWrap>
      </ChatWrapper>
    );
  }
}

export default Chat;
