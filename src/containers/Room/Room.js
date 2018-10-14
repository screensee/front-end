import React, { PureComponent } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import _ from 'lodash';
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
  static propTypes = {
    room: PropTypes.object,
    id: PropTypes.string.isRequired,
  }

  static defaultProps = {
    room: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let result = null;
    if (nextProps.room && !_.isEqual(nextProps.room, prevState.room)) {
      result = {
        room: nextProps.room,
      };
    }
    return result;
  }

  constructor() {
    super();
    this.state = {
      videoId: '',
      room: null,
      messages: [],
    };
    this.sendMessage = makeRequest('post')(createUrl.postMess());
  }

  componentDidMount() {
    if (!this.props.room && this.props.id) {
      makeRequest('post')(createUrl.roomJoin(this.props.id))()
        .then((room) => {

          this.setState({
            room,
          });
        });
        makeRequest('get')(createUrl.messGet(this.props.id))()
        .then((messages) => {
          this.setState({
            messages,
          });
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.room, this.state.room);
    if (!_.isEqual(prevState.room, this.state.room)) {
      roomMqtt.destroyRoom(this.state.room.id)
      roomMqtt.initRoom(this.state.room.id);
      roomMqtt.addCallback('message', this.onRemoteMessage);
    }
  }

  onRemoteMessage = (message) => {
    console.log(message);
    this.setState((state) => ({
      messages: [
        ...state.messages,
        message,
      ]
    }))
  }

  onSendMessage = (text) => {
    this.sendMessage({
      roomId: this.state.room.id,
      text,
    }).then((messages) => {
      this.setState({
        messages,
      })
    });
  }

  changeVideo = (id) => {
    console.log(id);
    this.setState({ videoId: id });
  };

  renderUserIcons = () => {
    let toRender = null;
    if (this.state.room) {
      const { participants } = this.state.room;
      toRender = participants.map((elem) => <StyledUserIcon name={elem} key={elem} img="" />);
    }
    return toRender;
  };

  render() {
    const { videoId } = this.state;
    return (
      <RoomWrapper>
        <UserSidebar>
          {this.renderUserIcons()}
          <MoreUsers>...</MoreUsers>
        </UserSidebar>
        <Chat onSendMessage={this.onSendMessage} messages={this.state.messages} />
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
