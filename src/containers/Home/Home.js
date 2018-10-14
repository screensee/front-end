import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    @media screen and (max-width: 768px) {
      width: 100px;
    }
    
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
  
  @media screen and (max-width: 768px) {
    width: 340px;
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
  
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
  
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const HomeSubTitle = styled.div`
  font-family: "josefinsans-light", sans-serif;
  font-size: 32px;
  text-transform: lowercase;
  color: black;
  
  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
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
  
  @media screen and (max-width: 768px) {
    width: 190px;
  }
`;

const StyledButton = styled(Button)`
  width: 420px;
  margin-top: 10px;
  
  @media screen and (max-width: 768px) {
    width: 340px;
  }
`;

const StyledModalButton = styled(Button)`
  margin-top: 30px;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
`;

const ModalBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .45);
  z-index: 1;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 4px solid black;
  background-color: white;
  width: 350px;
  height: 200px;
  z-index: 2;
`;

const CreateModalContent = styled(ModalContent)`
  height: 300px;
`;

const ModalInput = styled.input`
  border: 4px solid black;
  width: 200px;
  height: 40px;
  font-family: "josefinsans-semibold", sans-serif;
  margin-top: 10px;
  padding: 0 5px;
  outline: none;
  text-align: center;
`;

const ModalTitle = styled.span`
    font-size: 32px;
    font-family: "josefinsans-regular",sans-serif;
`;

class Home extends PureComponent {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onConnectRoom: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      createModal: false,
      connectModal: false,
    }
  }

  toggleConnectModal = () => this.connectInput.value ? this.setState({ connectModal: !this.state.connectModal }) : false;

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal });

  render() {
    const { createModal, connectModal } = this.state;

    return (
      <HomeWrapper>
        <IconBg>
          <img src={videoPlayer} alt="" />
          <img src={dialogue} alt="" />
          <img src={dialogue} alt="" />
          <img src={question} alt="" />
          <img src={question} alt="" />
        </IconBg>
        <HomeLayout>
          <TitleWrapper>
            <img src={visibility} alt="" />
            <HomeTitle>Share, Learn, Chat</HomeTitle>
            <HomeSubTitle>become smarter and have fun</HomeSubTitle>
          </TitleWrapper>
          <InputWrap>
            <HomeInput innerRef={(ref) => this.connectInput = ref } placeholder="insert room id or click create room" />
            <Button onClick={this.toggleConnectModal}>Connect</Button>
            <StyledButton onClick={this.toggleCreateModal}>Create room</StyledButton>
          </InputWrap>
        </HomeLayout>
        {createModal &&
          <Modal>
            <ModalBg onClick={this.toggleCreateModal} />
            <CreateModalContent>
              <ModalTitle>Create form:</ModalTitle>
              <ModalInput placeholder="your name" />
              <ModalInput placeholder="room name" />
              <ModalInput placeholder="youtube link" />
              <StyledModalButton onClick={this.props.onCreateRoom}>Create</StyledModalButton>
            </CreateModalContent>
          </Modal>
        }
        {connectModal && this.connectInput.value &&
          <Modal>
            <ModalBg onClick={this.toggleConnectModal} />
            <ModalContent>
              <ModalTitle>Connect form:</ModalTitle>
              <ModalInput placeholder="your name" />
              <StyledModalButton onClick={() => this.props.onConnectRoom(this.connectInput.value)}>Connect</StyledModalButton>
            </ModalContent>
          </Modal>
        }
      </HomeWrapper>
    );
  }
}

export default Home;
