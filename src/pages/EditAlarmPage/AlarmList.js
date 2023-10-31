import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

import upbitLogo from "img/upbit.png";
import binanceLogo from "img/binance.png";

// 최상위 컴포넌트의 채팅 ID를 사용할 수 있는 컨텍스트
import { chatContext } from 'App';

const CHAT_TYPE = 0;
const CHANNEL_TYPE = 1;

export default function AlarmList(props) {
  const { chatType, channel } = props;

  const chat = useContext(chatContext);

  const [alarmList, setAlarmList] = useState([]);

  const getAlarms = () => {
    var targetChat;
    if (chatType === CHAT_TYPE) {
      targetChat = chat;
    } else {
      targetChat = channel;
    }

    if (!targetChat) {
      setAlarmList([]);

      return;
    }

    targetChat.getAlarms().then(setAlarmList);
  };

  useEffect(getAlarms, [chat, props]);

  const alarmMapper = (alarm) => <AlarmListItemButton alarm={alarm} />

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
      {alarmList.map(alarmMapper)}
    </List>
  );
}

function AlarmListItemButton(props) {
  const { alarm, children } = props;

  const [openModal, setOpenModal] = useState(false);

  const exchangeLogoMap = {
    1: upbitLogo,
    2: binanceLogo
  };
  const exchangeId = alarm.item.exchange.id;

  const openAlarmEditModal = (event) => {
    setOpenModal(true);
  };

  const onAlarmSwitchChange = (event) => {
    const isChecked = event.target.checked;
    
    alarm.patchState(isChecked);
  }

  const alarmSwitch = <Switch
    defaultChecked={alarm.isEnabled}
    onChange={onAlarmSwitchChange}
  />

  return (
    <ListItemButton
      alignItems="flex-start"
      sx={{height: 100}}
      divider={true}
      onClick={openAlarmEditModal}
    >
      <ListItemAvatar>
        <Avatar src={exchangeLogoMap[exchangeId]} />
      </ListItemAvatar>
      <ListItemText primary={<AlarmDescription alarm={alarm} />} />
      {alarmSwitch}
    </ListItemButton>
  );
}

function AlarmDescription(props) {
  const { alarm } = props;

  const item = alarm.item;

  const alarmTitleText = `${item.baseSymbol}/${item.quoteSymbol}`;
  
  var alarmTypeText;
  var alarmDetailSymbol;
  switch (alarm.type) {
    case "WhaleAlarm":
      alarmTypeText = "고래 알림";
      alarmDetailSymbol = item.quoteSymbol;
      break;
    
    case "TickAlarm":
      alarmTypeText = "체결량 알림";
      alarmDetailSymbol = item.baseSymbol;
      break;
  }

  var alarmDetailText = `${alarm.quantity} ${alarmDetailSymbol} 이상 거래 체결 시 알림`;

  return (
    <Stack>
      <Typography variant="h4">{alarmTitleText}</Typography>
      <Typography variant="body2">{alarmTypeText}</Typography>
      <Typography variant="body2">{alarmDetailText}</Typography>
    </Stack>
  );
}