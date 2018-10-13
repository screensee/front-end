import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import Button from '../../components/Button';
import visibility from '../../assets/visibility.svg';
import dialogue from '../../assets/dialogue.svg';
import videoPlayer from '../../assets/video-player.svg';
import question from '../../assets/question.svg';

const HomeWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

const HomeLayout = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
`;

const rotate = keyframes`
  from {
    transform: translate(-50%, 0) rotate(0deg);
  }
  to {
    transform: translate(-50%, 0) rotate(360deg);
  }
`;

const IconBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  img {
    position: absolute;
    width: 150px;
    &:nth-child(1) {
      top: 35%;
      right: -50px;
      transform: rotate(-15deg) translate(0,-50%);
    }
    
    &:nth-child(2) {
      top: 70%;
      left: -50px;
      transform: rotate(-15deg) translate(0, -50%);
      width: 200px;
    }
    
    &:nth-child(3) {
      right: 30%;
      bottom: -40px;
      transform: rotate(15deg) translate(-50%,0);
    }
    
    &:nth-child(4) {
      width: 100px;
      top: 5%;
      left: 60px;
      transform: rotate(-20deg) translate(-50%,0);
    }
    
    &:nth-child(5) {
      width: 100px;
      bottom: 0;
      right: -30px;
      transform: rotate(-25deg);
    }
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 420px;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  
  img {
    position: absolute;
    min-width: 50px;
    max-width: 300px;
    width: 15vh;
    top: -19vh;
    left: 50%;
    animation: ${rotate} 25s linear infinite;
  }
`;

const HomeTitle = styled.div`
  font-family: "josefinsans-light", sans-serif;
  font-size: 64px;
  text-transform: uppercase;
  color: black;
`;

const HomeSubTitle = styled.div`
  font-family: "josefinsans-light", sans-serif;
  font-size: 32px;
  text-transform: lowercase;
  color: black;
`;

const HomeInput = styled.input`
  border: 4px solid black;
  height: 40px;
  width: 270px;
  margin-right: 10px;
  padding: 5px 10px;
  color: black;
  font-size: 14px;
  font-family: 'josefinsans-semibold', sans-serif;
  outline: none;
  text-align: center;
`;

const StyledButton = styled(Button)`
  && {
    width: 420px;
    margin-top: 10px;
  }
`;

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <IconBg>
          <img src={videoPlayer} alt=""/>
          <img src={dialogue} alt=""/>
          <img src={dialogue} alt=""/>
          <img src={question} alt=""/>
          <img src={question} alt=""/>
        </IconBg>
        <HomeLayout>
          <TitleWrapper>
            <img src={visibility} alt=""/>
            <HomeTitle>Share, Learn, Chat</HomeTitle>
            <HomeSubTitle>become smarter and have fun</HomeSubTitle>
          </TitleWrapper>
          <InputWrap>
            <HomeInput placeholder="insert room id or click create room" />
            <Button>Connect</Button>
            <StyledButton>Create room</StyledButton>
          </InputWrap>
        </HomeLayout>

      </HomeWrapper>
    );
  }
}

export default Home;
