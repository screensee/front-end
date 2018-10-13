import React, { Component } from 'react';
import styled from 'styled-components'
import SettingsBar from '../../components/SettingsBar';
import UserIcon from '../../components/UserIcon';
import Chat from '../Chat';
import Video from '../../components/Video';

const RoomWrapper = styled.div`
  background-color: #333;
  color: white;
  text-align: center;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserSidebar = styled.div`
  display: block;
  position: absolute;
  left: 10px;
  top: calc(50% + 40px);
  transform: translate(0, -50%);
`;

const StyledUserIcon = styled(UserIcon)`
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MoreUsers = styled.span`
  display: block;
  color: black;
  background-color: red;
  font-size: 26px;
  width: 34px;
  height: 34px;
  border: 2px solid black;
`;

// eslint-disable-next-line
const Video111 = styled.iframe`
  position: absolute;
  top: calc(50% + 40px);
  left: 50%;
  width: 70vw;
  height: calc(70vw / 16 * 9);
  max-height: 560px;
  max-width: 995px;
  min-width: 768px;
  min-height: 432px;
  transform: translate(-50%, -50%);
`;

class Room extends Component {
  constructor() {
    super();
    this.state = {
      videoId: '',
    }
  }

  changeVideo = (id) => {
    console.log(id);
    this.setState({ videoId: id});
  };

  render() {
    const {videoId} = this.state;
    return (
      <RoomWrapper>
        <UserSidebar>
          <StyledUserIcon name="roman" img=""/>
          <StyledUserIcon name="yurii" img=""/>
          <StyledUserIcon name="david" img=""/>
          <StyledUserIcon name="antony" img=""/>
          <StyledUserIcon name="dmitri" img=""/>
          <StyledUserIcon name="andrew" img=""/>
          <StyledUserIcon name="roman" img=""/>
          <MoreUsers>...</MoreUsers>
        </UserSidebar>
        <Chat />
        <SettingsBar changeVideo={this.changeVideo} />
        { 
          videoId !== '' && 
          // <Video title="vid" width="560" height="315"
          //                                     src={`https://www.youtube.com/embed/${this.state.videoId}?rel=0&amp;controls=0&amp;showinfo=0`}
          //                                     frameBorder="0"
          //                                     allow="autoplay; encrypted-media"
          //                                     allowFullScreen />
          <Video videoId={videoId} />
        }

      </RoomWrapper>
    );
  }
}

export default Room;
