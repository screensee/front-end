import React, { Component } from 'react';
import styled from 'styled-components'


const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: black;
  font-family: "josefinsans-semibold", sans-serif;
  text-decoration: none;
  font-size: ${(props) => props.size ? props.size : 16}px;
  z-index: 1;
  cursor: pointer;
  outline: none;
  transition: 275ms ease-out;
`;

const ButtonStyled = styled.button`
  position: relative;
  background-color: white;
  width: 140px;
  height: 40px;
  border: 4px solid black;
  text-decoration: none;
  overflow: hidden;
  transition: 135ms ease-in;
  cursor: pointer;
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: yellow;
    transform: translate(0, 37px);
    transition: 275ms ease-out;
    cursor: pointer;
  }
  
  &:hover {
    ${ButtonWrapper} {
      letter-spacing: .7px;
      transition: 75ms ease-in;
    }  
  
    &:after {
      transform: translate(0, 0);
      transition: 75ms ease-in;
    }
  }
`;

class Button extends Component {
  render() {
    const { size, children, className, onClick } = this.props;
    return (
      <ButtonStyled {...this.props} onClick={onClick} className={className} size={size}>
        <ButtonWrapper>
          {children}
        </ButtonWrapper>
      </ButtonStyled>
    );
  }
}

export default Button;
