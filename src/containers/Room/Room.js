import React, { PureComponent } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
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
  z-index: 1;
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
  };

  static defaultProps = {
    room: null,
  };

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
    this.sendMessage = makeRequest('post')(createUrl.messPost());
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.exitRoom, false);

    if (!this.props.room && this.props.id) {
      makeRequest('post')(createUrl.roomJoin(this.props.id))()
        .then((room) => {
          this.setState({
            room,
          });
          makeRequest('get')(createUrl.messGet(room.id))()
            .then((messages) => {
              this.setState({
                messages,
              });
            })
        });
    } else if (this.props.room) {
      this.initRoom();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.room, this.state.room)) {
      this.initRoom();
    }
  }

  componentWillUnmount() {
    makeRequest('post')(createUrl.exitRoom(this.state.room.id))();
    window.removeEventListener("beforeunload", this.exitRoom, false);
  }

  initRoom = () => {
    const { room } = this.state;
    roomMqtt.initRoom(room.id);
    roomMqtt.addCallback('message', this.onRemoteMessage);
    if (room.videoLink) {
      this.changeVideo(room.videoLink);
    }
  }

  onRemoteMessage = (message) => {
    this.setState((state) => ({
      messages: [
        ...state.messages,
        message,
      ]
    }))
  };

  exitRoom = () => {
    makeRequest('post')(createUrl.exitRoom(this.state.room.id))();
  };

  onSendMessage = (text) => {
    this.sendMessage({
      roomId: this.state.room.id,
      text,
    }).then((message) => {
      // this.setState({
      //   messages,
      // })
    });
  };

  changeVideo = (value) => {
    let id;
    const splitted = value.split('?');
    if (splitted.length > 1) {
      const params = queryString.parse(splitted[1]);
      if (params.v) {
        id = params.v
      }
    } else {
      id = value;
    }

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
    const { videoId, room, } = this.state;
    return (
      <RoomWrapper>
        <UserSidebar>
          {this.renderUserIcons()}
          {false && <MoreUsers>...</MoreUsers>}
        </UserSidebar>
        <Chat onSendMessage={this.onSendMessage} messages={this.state.messages} />
        <SettingsBar changeVideo={this.changeVideo} defaultUrl={_.get(room, 'videoLink')} />
        {
          videoId !== '' &&
          // <Video title="vid" width="560" height="315"
          //                                     src={`https://www.youtube.com/embed/${this.state.videoId}?rel=0&amp;controls=0&amp;showinfo=0`}
          //                                     frameBorder="0"
          //                                     allow="autoplay; encrypted-media"
          //                                     allowFullScreen />
          <Video videoId={videoId} isMaster={_.get(room, 'isMaster', false)} />
        }

      </RoomWrapper>
    );
  }
}

export default Room;
