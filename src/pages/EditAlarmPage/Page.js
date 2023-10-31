import React, { useState } from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import { Telegram, Campaign } from '@mui/icons-material';

import { useChannelSelect } from 'hooks/useChannelSelect';
import AlarmList from './AlarmList';

const CHAT_TYPE = 0;
const CHANNEL_TYPE = 1;

export default function EditAlarmPage(props) {
  const [chatType, ChatTypeNavigation] = useBottomNavigation();
  const [selectedChannel, ChannelSelect] = useChannelSelect();

  return (
    <div>
      {chatType === CHANNEL_TYPE ? ChannelSelect : null}
      <AlarmList
        chatType={chatType}
        channel={selectedChannel} />
      <ChatTypeNavigation />
    </div>
  );
}

const useBottomNavigation = () => {
  const [chatType, setChatType] = useState(CHAT_TYPE);

  const onNavigationSelectChange = (event, value) => {
    setChatType(value);
  };

  const render = () => {
    return (
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation 
          showLabels
          value={chatType}
          onChange={onNavigationSelectChange}
        >
          <BottomNavigationAction label='개인 채팅' icon={<Telegram />} />
          <BottomNavigationAction label='채널' icon={<Campaign />} />
        </BottomNavigation>
      </Paper>
    );
  };

  return [chatType, render];
};