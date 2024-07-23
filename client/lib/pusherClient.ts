import Pusher from 'pusher-js';

const pusherClient = new Pusher('b6140875af8b35fe0835', {
  cluster: 'ap1',
});

export default pusherClient;
