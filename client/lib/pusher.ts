import Pusher from 'pusher';

// const pusher = new Pusher({
//   appId: process.env.NEXT_PUSHER_APP_ID!,
//   key: process.env.NEXT_PUSHER_KEY!,
//   secret: process.env.NEXT_PUSHER_SECRET!,
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//   useTLS: true,
// });

const pusher = new Pusher({
  appId: '1837098',
  key: 'b6140875af8b35fe0835',
  secret: 'a65c30ede9648691e5f3',
  cluster: 'ap1',
  useTLS: true,
});

export default pusher;
