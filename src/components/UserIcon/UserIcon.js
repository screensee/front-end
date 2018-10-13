import React, { Component } from 'react';
import styled, { css } from 'styled-components'

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: 2px solid black;
  
  ${(props) => props.fromChat && css`
    border-radius: 50%;
  `};
`;

const Name = styled.span`
  margin-top: 7px;
  font-size: 26px;
  font-family: "josefinsans-italic", sans-serif;
  color: black;
`;

class UserIcon extends Component {
  render() {
    const { name, img, fromChat, className } = this.props;

    return (
      <UserIconWrapper fromChat={fromChat} className={className}>
        <Name>{name[0].toUpperCase()}</Name>
        {img && <img src={img} alt=""/>}
      </UserIconWrapper>
    );
  }
}

export default UserIcon;
