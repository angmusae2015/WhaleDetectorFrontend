import { get } from "util/util";
import { Alarm, createResponseHandler, parseItem } from "objects";

export function Channel(id, name, chat, alarmOption) {
  this.id = id;
  this.name = name;
  this.chat = chat;
  this.alarmOption = alarmOption;

  this.url = `/chats/${this.chat.id}/channels/${this.id}`;

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

    const handleResponse = createResponseHandler("alarms", mapper);

    return get(this.url + "/alarms").then(handleResponse);
  };
}

