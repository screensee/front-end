import React, { Component } from 'react';
import styled, { css } from 'styled-components'
import Button from "../Button";
import SettingsIcon from "../../assets/settings.svg";

const SettingsBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  bottom: 5%;
  right: 0;
  height: 150px;
  width: 200px;
  background-color: white;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  z-index: 2;
  transform: translate(100%, 0);
  transition: 215ms ease-out;
  box-shadow: 0 0 20px 2px rgba(0,0,0,0);
  
  ${(props) => props.expanded && css`
    box-shadow: 0 0 20px 2px rgba(0,0,0,.45);
    transform: translate(0, 0);
    transition: 135ms ease-in;
  `};
`;

const SettingsInput = styled.input`
  border: 4px solid black;
  width: 140px;
  height: 40px;
  margin-bottom: 10px;
  text-align: center;
  font-family: "josefinsans-semibold", sans-serif;
  outline: none ;
`;

const VisibleIcon = styled.div`
  position: absolute;
  left: -64px;
  bottom: -4px;
  background-color: black;
  padding: 5px 5px 1px;
  cursor: pointer;
  box-shadow: -2px 0 20px 2px rgba(0,0,0,.45);
  transition: 215ms ease-out;

  img {
    width: 50px;
    cursor: pointer;
  }
`;

class SettingsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  onInputeRef = (ref) => {
    this.videoInput = ref;
  };

  onClick = () => {
    if (this.videoInput) {
      this.props.changeVideo(this.videoInput.value)
      this.toggleExpand();
    }
  };

  render() {
    return (
      <SettingsBarWrapper expanded={this.state.expanded}>
        <VisibleIcon onClick={this.toggleExpand}>
          <img src={SettingsIcon} alt="" />
        </VisibleIcon>
        <SettingsInput innerRef={this.onInputeRef} placeholder="insert video link" defaultValue={this.props.defaultUrl} />
        <Button onClick={this.onClick}>Set Video</Button>
      </SettingsBarWrapper>
    );
  }
}

export default SettingsBar;
