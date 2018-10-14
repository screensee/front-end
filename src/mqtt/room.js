import client from './index';

let callbacks = {};
let roomId;

export default {
  initRoom: (id) => {
    roomId = id
    if (client.connected) {
      client.subscribe(`room/${roomId}/#`, (err, data) => {
        console.log(err, data);
      });
    } else {
      client.on('connect', () => {
        client.subscribe(`room/${roomId}/#`, (err, data) => {
          console.log(err, data);
        });
      });
    }
    client.on('message', onRoomMessage);
  },
  addCallback: (subTopic, cb) => {
    const topic = `room/${roomId}/${subTopic}`;
    if (!callbacks[topic]) {
      callbacks[topic] = [];
    }
    callbacks[topic].push(cb);
  },
  destroyRoom: (id) => {
    callbacks = {};
    client.unsubscribe(`room/${roomId}/#`);
    client.removeListener('message', onRoomMessage);
  },
  sendPlaybackInfo: (topic, data) => {
    client.publish(`room/${roomId}/${topic}`, data.toString());
  },
}

function onRoomMessage(topic, messageBuffer) {
  let message = messageBuffer.toString();
  if (message[0] === '{') {
    message = JSON.parse(message);
  }
  if (callbacks[topic]) {
    callbacks[topic].forEach((cb) => {
      cb(message, topic);
    })
  }
}
