import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Video.css';


class Video extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string,
  };

  static defaultProps = {
    videoId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
    }
    this.player = null;
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

  initPlayer = () => {
    console.log(this);
    const { videoId } = this.props;
    this.player = new window.YT.Player('player', {
      height: '315',
      width: '560',
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event) => { console.log(event) },
        onPlaybackQualityChange: (event) => { console.log(event) },
        onStateChange: (event) => { console.log(event) },
        onError: (event) => { console.log(event) },
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
