import client from './index';

const callbacks = {};
let roomId;

export default {
  initRoom: (id) => {
    roomId = id
    client.on(`room/${roomId}/#`, (topic, messageBuffer) => {
      let message = messageBuffer.toString();
      if (message[0] === '{') {
        message = JSON.parse(message);
      }
      if (callbacks[topic]) {
        callbacks[topic].forEach((cb) => {
          cb(message, topic);
        })
      }
    });
  },
  addCallback: (subTopic, cb) => {
    const topic = `room/${roomId}/${subTopic}`;
    if (!callbacks[topic]) {
      callbacks[topic] = [];
    }
    callbacks[topic].push(cb);
  },
}
