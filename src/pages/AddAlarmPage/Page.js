import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';

import { Box } from '@mui/material';

import { 
  AccordionPanel,
  AccordionMenu,
  ChatTypeSelectPanelContent,
  ChannelSelectPanelContent,
  AlarmTypeSelectPanelContent,
  ItemSelectPanelContent,
  QuantityInputPanelContent
} from 'layouts/Accordion';

// 최상위 컴포넌트의 채팅 ID를 사용할 수 있는 컨텍스트
import { chatContext } from 'App';

import PostButton from './PostButton';

// PostButton 컴포넌트에 알림 정보를 전달하는 컨텍스트
export const alarmInfoContext = createContext();

function AddAlarmPage() {
  const chat = useContext(chatContext);

  const [isChannel, setIsChannel] = useState(null);
  const [channel, setChannel] = useState(null);
  const [alarmType, setAlarmType] = useState(null);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const [symbol, setSymbol] = useState('');

  // alarmInfoContext에 사용할 값
  const contextValue = useMemo(() => ({
    chat,
    isChannel,
    channel,
    alarmType,
    item,
    quantity
  }), [chat, isChannel, channel, alarmType, item, quantity]);

  // 알림 유형과 종목 선택 시 실행되는 효과 함수
  useEffect(() => {
    // 알림 유형 또는 종목이 선택되지 않았을 경우 가격 선택 단위 초기화
    if (alarmType === null || item === null) {
      setSymbol('');
      return;
    }
    
    if (alarmType === 'TickAlarm') setSymbol(item.baseSymbol)
    else if (alarmType === 'WhaleAlarm') setSymbol(item.quoteSymbol);
  }, [alarmType, item]);

  return (
    <div>
      <AccordionMenu id='add-alarm-accordion-menu'>
        <AccordionPanel title='채팅 유형'>
          <ChatTypeSelectPanelContent setValue={setIsChannel} />
        </AccordionPanel>
        <AccordionPanel title='채널' disabled={!isChannel}>
          <ChannelSelectPanelContent setValue={setChannel} />
        </AccordionPanel>
        <AccordionPanel title='알림 유형'>
          <AlarmTypeSelectPanelContent setValue={setAlarmType} />
        </AccordionPanel>
        <AccordionPanel title='종목'>
          <ItemSelectPanelContent setValue={setItem} />
        </AccordionPanel>
        <AccordionPanel title='가격' disabled={!alarmType || !item}>
          <QuantityInputPanelContent symbol={symbol} setValue={setQuantity}/>
        </AccordionPanel>
      </AccordionMenu>
      <alarmInfoContext.Provider value={contextValue}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse'
          }} >
          <PostButton />
        </Box>
      </alarmInfoContext.Provider>
    </div>
  );
}

export default AddAlarmPage;