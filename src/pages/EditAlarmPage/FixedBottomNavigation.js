import React, { useState } from 'react'

import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Telegram, Campaign } from '@mui/icons-material';

export default function ChatTypeNavigation() {
  const [chatType, setChatType] = useState(CHAT_TYPE);

  const onNavigationSelectChange = (event, value) => {
    setChatType(value);
  };

  const render = (
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

  return [chatType, render];
}