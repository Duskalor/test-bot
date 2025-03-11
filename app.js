import { messageToChat } from './message.js';
import { getData } from './extractData.js';

getData().then((data) => {
  console.log('AQUII');
  console.log(data);
  // messageToChat(data);
});
