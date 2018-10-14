import mqtt from 'mqtt';

const client  = mqtt.connect(process.env.NODE_ENV === 'development' ? 'mqtt://185.143.145.119:1884' : 'mqtt://185.143.145.119:1884');
client.on('connect', function () {
  console.log('connected');
  // client.subscribe('room/5714916835841872/message', function (err) {
    // if (!err) {
      // client.publish('presence/123/123', 'Hello mqtt!!!')
    // }
  // });
});

client.on('message', function (topic, messageBuffer) {
  const message = messageBuffer.toString();
  // console.log(message);
});

export default client;
