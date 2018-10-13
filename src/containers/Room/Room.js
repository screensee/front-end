import React, { Component } from 'react';
import SettingsBar from '../../components/SettingsBar';
import UserIcon from '../../components/UserIcon';
import Chat from '../Chat';
import styled from 'styled-components'

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
`;

const Video = styled.iframe`
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
    return (
      <RoomWrapper>
        <UserSidebar>
          <UserIcon name="roman" img=""/>
        </UserSidebar>
        <Chat />
        <SettingsBar changeVideo={this.changeVideo} />
        { this.state.videoId !== '' && <Video title="vid" width="560" height="315"
                                              src={`https://www.youtube.com/embed/${this.state.videoId}?rel=0&amp;controls=0&amp;showinfo=0`}
                                              frameBorder="0"
                                              allow="autoplay; encrypted-media"
                                              allowFullScreen />}

      </RoomWrapper>
    );
  }
}

export default Room;
