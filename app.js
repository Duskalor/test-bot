import { messageToChat } from './message.js';
import { getData } from './extractData.js';

getData().then((data) => {
  console.log(data);
  messageToChat(data, 50);
});
