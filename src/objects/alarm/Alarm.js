import { get, patch } from 'util/util';

export function Alarm(id, type, chat, item, quantity, isEnabled, isChannel) {
  this.id = id;
  this.type = type;
  this.chat = chat;
  this.item = item;
  this.quantity = quantity;
  this.isEnabled = isEnabled;
  this.isChannel = isChannel;

  this.url = `${this.chat.url}/alarms/${this.id}`;

  this.patchQuantity = (quantity) => {
    const params = {
      "quantity": quantity
    };

    return patch(this.url, params);
  };

  this.patchState = (state) => {
    const params = {
      "is_enabled": state
    };

    return patch(this.url, params);
  };
}