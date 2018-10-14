import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import roomMqtt from '../../mqtt/room';
import './Video.css';

const DELTA = 2;

class Video extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string,
    isMaster: PropTypes.bool,
  };

  static defaultProps = {
    videoId: '',
    isMaster: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    }
    this.player = null;
    roomMqtt.addCallback('play', this.onMqttPlay);
    roomMqtt.addCallback('seek', this.onMqttSeek);
    roomMqtt.addCallback('pause', this.onMqttPause);
    roomMqtt.addCallback('currentTime', this.onMasterTime);

    this.currentTimeId = null;
  }

  componentDidMount() {
    if (window.YT) {
      this.initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        this.initPlayer();
      }
    }
  }

  componentWillUnmount() {
    window.onYouTubeIframeAPIReady = undefined;
    if (this.player) {
      this.player.destroy();
    }
  }

  sendMasterTime = () => {
    roomMqtt.sendPlaybackInfo('currentTime', this.player.getCurrentTime());
  }

  onMqttPlay = () => {
    if (!this.props.isMaster && this.player) {
      this.player.playVideo();
    }
  };

  onMqttPause = () => {
    if (!this.props.isMaster && this.player) {
      this.player.pauseVideo();
    }
  };

  onMqttSeek = (time) => {
    if (!this.props.isMaster && this.player) {
      this.player.seekTo(time, true);
    }
  };

  onMasterTime = (time) => {
    if (!this.props.isMaster && this.player) {
      if (Math.abs(this.player.getCurrentTime() - time) > DELTA) {
        this.player.seekTo(time, true);
      }
    }
  }

  onPlayerStateChange = (event) => {
    if (this.props.isMaster) {
      if (event.data === 1) {
        roomMqtt.sendPlaybackInfo('play', {});
        this.currentTimeId = window.setInterval(this.sendMasterTime, 1000);
      } else if (event.data === 2) {
        roomMqtt.sendPlaybackInfo('pause', {});
        window.clearInterval(this.currentTimeId);
      }
    }
  };

  initPlayer = () => {
    const { videoId, isMaster } = this.props;
    this.player = new window.YT.Player('player', {
      height: '315',
      width: '560',
      videoId,
      playerVars: {
        autoplay: 1,
        controls: Number(isMaster),
        showinfo: Number(isMaster),
      },
      events: {
        // onReady: (event) => { console.log(event) },
        // onPlaybackQualityChange: (event) => { console.log(event) },
        onStateChange: this.onPlayerStateChange,
        // onError: (event) => { console.log(event) },
      }
    });
  };

  render() {
    return (
      <div id="player"></div>
    );
  }
}

export default Video;
