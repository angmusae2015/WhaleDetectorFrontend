import { get, post, patch } from 'util/util';
import { createResponseHandler, parseItem } from 'objects';
import { Alarm, Channel } from 'objects';

export function Chat(id, alarmOption) {
  this.id = id;
  this.alarmOption = alarmOption;

  this.url = `/chats/${this.id}`;
  
  this.getChannels = () => {
    const mapper = (channelInfo) => {
      const { id, name, chat, alarmOption } = channelInfo;
      const channel = new Channel(id, name, this, alarmOption);

      return channel;
    };

    const handleResponse = createResponseHandler('channels', mapper);

    return get(this.url + "/channels").then(handleResponse);
  };

  this.postChannel = (channelId, channelName) => {
    const params = {
      'channel_id': channelId,
      'name': channelName
    };

    return post(this.url + "/channels", params);
  }

  this.getAlarms = () => {
    const mapper = (alarmInfo) => {
      const {
        id: id,
        type: type, 
        chat: chatInfo, 
        item: itemInfo, 
        quantity: quantity, 
        is_enabled: isEnabled, 
        is_channel: isChannel 
      } = alarmInfo;
      const item = parseItem(itemInfo);
      const alarm = new Alarm(id, type, this, item, quantity, isEnabled, isChannel);

      return alarm;
    };

    const handleResponse = createResponseHandler('alarms', mapper);

    return get(this.url + "/alarms").then(handleResponse);
  };
}

export function getChat(id) {
  const parseChat = (response) => {
    const chatInfo = response.data;

    const alarmOption = chatInfo['alarm_option']

    return new Promise((resolve) => {
      resolve(new Chat(id, alarmOption));
    });
  };

  return get(`/chats/${id}`).then(parseChat);
}