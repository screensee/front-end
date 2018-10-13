import React, { PureComponent } from 'react';
import styled from 'styled-components'
import SettingsBar from '../../components/SettingsBar';
import UserIcon from '../../components/UserIcon';
import Chat from '../Chat';
import Video from '../../components/Video';
import roomMqtt from '../../mqtt/room';
import makeRequest, { createUrl } from '../../utils/request';

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

class Room extends PureComponent {
  constructor() {
    super();
    this.state = {
      videoId: '',
    }

    makeRequest('post')(createUrl.roomCreate())()()
      .then((response) => {
        if (response) {
          roomMqtt.initRoom(response.id);
          roomMqtt.addCallback('message', this.onMessage);
        }
      });
  }

  onMessage = (message) => {
    console.log(message);
  }

  changeVideo = (id) => {
    console.log(id);
    this.setState({ videoId: id });
  };

  render() {
    const { videoId } = this.state;
    return (
      <RoomWrapper>
        <UserSidebar>
          <StyledUserIcon name="roman" img="" />
          <StyledUserIcon name="yurii" img="" />
          <StyledUserIcon name="david" img="" />
          <StyledUserIcon name="antony" img="" />
          <StyledUserIcon name="dmitri" img="" />
          <StyledUserIcon name="andrew" img="" />
          <StyledUserIcon name="roman" img="" />
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
