import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AccordionMenu from '../AccordionComponent/AccordionMenu';
import AccordionPanel from '../AccordionComponent/AccordionPanel';
import {
  ChatTypeSelectPanelContent,
  ChannelSelectPanelContent,
  AlarmTypeSelectPanelContent,
  ItemSelectPanelContent
} from '../AccordionComponent/AccordionPanelContent';

function EditAlarmPage() {
  const [isChannel, setIsChannel] = useState(null);
  const [channelID, setChannelID] = useState(null);
  const [alarmType, setAlarmType] = useState(null);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(null);

  return (
    <div>
      <AccordionMenu id='edit-alarm-accordion-menu'>
        <AccordionPanel title='채팅 유형'>
          <ChatTypeSelectPanelContent setValue={setIsChannel} />
        </AccordionPanel>
        <AccordionPanel title='채널' disabled={!isChannel}>
          <ChannelSelectPanelContent setValue={setChannelID} />
        </AccordionPanel>
        <AccordionPanel title='알림 유형'>
          <AlarmTypeSelectPanelContent setValue={setAlarmType} />
        </AccordionPanel>
        <AccordionPanel title='종목'>
          <ItemSelectPanelContent setValue={setItem} />
        </AccordionPanel>
      </AccordionMenu>
    </div>
  );
}

export default EditAlarmPage;