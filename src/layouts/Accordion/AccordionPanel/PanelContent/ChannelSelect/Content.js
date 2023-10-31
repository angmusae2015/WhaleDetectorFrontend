import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

import { useChannelSelect } from 'hooks/useChannelSelect';

// 최상위 컴포넌트의 채팅 ID를 사용할 수 있는 컨텍스트
import { chatContext } from 'App';

// AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

/*
  ChannelSelectPanelContent(function setValue(number channelID)): 채널을 선택하는 컴포넌트
    function setValue(number channelID): 상위 컴포넌트에서 전달받는 세터 함수
      number channelID: 선택한 채널의 ID
*/

/**
 * @typedef { Object } ChannelSelectPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { ChannelSelectPanelContentProps } props
 */
function ChannelSelectPanelContent(props) {
  const { setValue: setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);
  const chat = useContext(chatContext);

  const [selectedChannel, channelSelect] = useChannelSelect();

  const onChannelSelect = () => {
    if (!selectedChannel) return;

    setDisplayedText(selectedChannel.name);
    setValue(selectedChannel);
  };
  useEffect(onChannelSelect, [selectedChannel]);
}

ChannelSelectPanelContent.defaultValue = {
  setValue: (value) => {}
};

export default ChannelSelectPanelContent;