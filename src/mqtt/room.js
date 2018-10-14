import client from './index';

let callbacks = {};
let roomId;

export default {
  initRoom: (id) => {
    roomId = id
    client.on(`room/${roomId}/#`, onRoomMessage);
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
    client.removeListener(`room/${roomId}/#`, onRoomMessage);
  }
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
