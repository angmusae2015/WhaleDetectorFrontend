import React, { useState, useEffect, useContext } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// 최상위 컴포넌트의 채팅 ID를 사용할 수 있는 컨텍스트
import { chatContext } from 'App';

export const useChannelSelect = () => {
  const [channelList, setChannelList] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const chat = useContext(chatContext);

  useEffect(() => {
    chat.getChannels().then(setChannelList);
  }, [chat]);

  const onChannelSelect = (event) => {
    const selectedIndex = event.target.value;

    setSelectedChannel(channelList[selectedIndex]);
  };

  const renderMenuItemList = () => {
    const mapper = (channel, index) => (
      <MenuItem key={index} value={index}>
        {channel.name}
      </MenuItem>
    );

    const menuItemList = channelList ? channelList.map(mapper) : [];

    return menuItemList;
  };

  const render = (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>채널명</InputLabel>
      <Select
        label='채널명'
        onChange={onChannelSelect}
      >
        {renderMenuItemList()}
      </Select>
    </FormControl>
  );

  return [selectedChannel, render];
}