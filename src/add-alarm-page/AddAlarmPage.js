import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ChatTypeSelectAccordion from './ChatTypeSelector';
import ChannelSelectAccordion from './ChannelSelector';
import AlarmTypeSelectAccordion from './AlarmTypeSelector';
import ItemSelectAccordion from './ItemSelector';
import QuantityInputAccordion from './QuantityInput';

function AddAlarmPage() {
  // 채팅 및 알림 관련 상태 초기화
  const [chatID, setChatID] = useState(null);
  const [isChannel, setIsChannel] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null);
  const [alarmType, setAlarmType] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [quantity, setQuantity] = useState(null);

  // 아코디언 패널 상태 초기화
  const [disableChatTypeSelectAccordion, setDisableChatTypeSelectAccordion] = useState(false);
  const [disableChannelSelectAccordion, setDisableChannelSelectAccordion] = useState(true);
  const [disableAlarmTypeSelectAccordion, setDisableAlarmTypeSelectAccordion] = useState(true);
  const [disableItemSelectAccordion, setDisableItemSelectAccordion] = useState(true);
  const [disableQuantityInputAccordion, setDisableQuantityInputAccordion] = useState(true);

  // 아코디언 패널 접힘 상태 초기화
  const [expanded, setExpanded] = useState(false);

  // 현재 페이지의 URL 파라미터 정보 가져오기
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 페이지가 로드될 때 chatID 상태 설정
  useEffect(() => {
    setChatID(queryParams.get('chat_id'));
  }, []);

  // 선택한 채팅 유형 상태 변경 시 실행되는 함수
  useEffect(() => {
    if (isChannel !== null) {
      // 채널 선택 시
      if (isChannel) {
        // 채널 선택 아코디언 활성화
        setDisableChannelSelectAccordion(false);
      
      // 개인 채팅 선택 시
      } else {
        // 채널 선택 아코디언 비활성화
        setDisableChannelSelectAccordion(true);
        // 알림 유형 선택 아코디언 활성화
        setDisableAlarmTypeSelectAccordion(false);
      }
    }
  }, [isChannel]);

  // 선택된 채널 정보 상태 변경 시 실행되는 함수
  useEffect(() => {
    if (channelInfo !== null) {
      // 알림 유형 선택 아코디언 활성화
      setDisableAlarmTypeSelectAccordion(false);
    }
  }, [channelInfo]);

  // 선택한 알림 유형 상태 변경 시 실행되는 함수
  useEffect(() => {
    if (alarmType !== null) {
      // 종목 선택 아코디언 활성화
      setDisableItemSelectAccordion(false);
    }
  }, [alarmType]);

  // 선택한 종목 상태 변경 시 실행되는 함수
  useEffect(() => {
    if (itemInfo !== null) {
      // 가격 선택 아코디언 활성화
      setDisableQuantityInputAccordion(false);
    }
  }, [itemInfo]);

  useEffect(() => {
    if (quantity !== null) {
      console.log(quantity);
    }
  }, [quantity]);

  // 아코디언 패널이 접히거나 열릴 때 실행되는 함수
  const handleChange = (panel) => (event, isExpanded) => {
    /* panel 식별자를 가진 패널이 열리면 expanded 상태에 해당 식별자가 업데이트됨
       접히면 expanded 상태에는 false가 업데이트됨 */
    setExpanded(isExpanded ? panel: false);
  };

  return (
    <div>
      <ChatTypeSelectAccordion
        accordionProps={{
          disabled: disableChatTypeSelectAccordion,
          /* 현재 expanded 상태에 저장된 식별자와 자신의 식별자가 같을 경우 패널을 열음
             저장된 식별자와 자신의 식별자가 다를 경우 패널을 닫음 */
          expanded: expanded === 'panel1',
          onChange: handleChange('panel1')
        }}
        isChannel={isChannel}
        setIsChannel={setIsChannel} />
      <ChannelSelectAccordion
        accordionProps={{
          disabled: disableChannelSelectAccordion,
          expanded: expanded === 'panel2',
          onChange: handleChange('panel2')
        }}
        channelInfo={channelInfo}
        setChannelInfo={setChannelInfo}
        chatID={chatID} />
      <AlarmTypeSelectAccordion
        accordionProps={{
          disabled: disableAlarmTypeSelectAccordion,
          expanded: expanded === 'panel3',
          onChange: handleChange('panel3')
        }}
        setAlarmType={setAlarmType} />
      <ItemSelectAccordion
        accordionProps={{
          disabled: disableItemSelectAccordion,
          expanded: expanded === 'panel4',
          onChange: handleChange('panel4')
        }}
        setItemInfo={setItemInfo} />
      <QuantityInputAccordion
        accordionProps={{
          disabled: disableQuantityInputAccordion,
          expanded: expanded === 'panel5',
          onChange: handleChange('panel5')
        }}
        alarmType={alarmType}
        itemInfo={itemInfo}
        setQuantity={setQuantity} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }} >
        <PostButton alarmInfo={{
          chatID: chatID,
          isChannel: isChannel,
          channelInfo: channelInfo,
          alarmType: alarmType,
          itemInfo: itemInfo,
          quantity: quantity
        }} />
      </Box>
    </div>
  );
}

// 알림을 설정하는 버튼
function PostButton(props) {
  const { chatID, isChannel, channelInfo, alarmType, itemInfo, quantity } = props.alarmInfo;

  const [disableButton, setDisableButton] = useState(true);
  const [buttonText, setButtonText] = useState("알림 추가");

  const postAlarm = () => {
    const endpoint = "/database/alarm/create";
    const params = {
      type: alarmType,
      chat_id: (isChannel ? channelInfo['ChatID'] : chatID),
      exchange_id: itemInfo['ExchangeID'],
      base_symbol: itemInfo['BaseSymbol'],
      quote_symbol: itemInfo['QuoteSymbol'],
      quantity: quantity,
      is_channel: isChannel
    };

    setDisableButton(true);
    axios.post(endpoint, params)
      .then(response => {
        setButtonText("완료!");
      });
  }

  // 올바른 가격 입력 시 알림 설정 버튼 활성화
  useEffect(() => {
    setDisableButton(!quantity || (quantity < 0));
  }, [quantity]);

  return (
    <Button
      disabled={disableButton}
      variant="contained"
      sx={{mt: 1}}
      onClick={postAlarm} >
      {buttonText}
    </Button>
  );
}

export default AddAlarmPage;