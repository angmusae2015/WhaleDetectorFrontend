import React, { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import getInfoFunction from '../util/util';

/**
 * @typedef { Object } channelInfo
 * @property { string } ChannelName
 * @property { number } ChatID
 * @property { boolean } AlarmOption
 */

/**
 * @typedef { Object } AccordionProps
 * @property { Object } accordionProps
 * @property { channelInfo } channelInfo
 * @property { function(channelInfo) } setChannelInfo
 * @property { number } chatID
 */

/**
 * @param { AccordionProps } props
 */
function ChannelSelectAccordion(props) {
  const { accordionProps, channelInfo, setChannelInfo, chatID } = props;

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          {"채널" + (!accordionProps.expanded && channelInfo !== null ? `: ${channelInfo['ChannelName']}` : "")}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ChannelSelector setChannelInfo={setChannelInfo} chatID={chatID} />
      </AccordionDetails>
    </Accordion>
  );
}

ChannelSelectAccordion.defaultProps = {
  accordionProps: {},
  channelInfo: {
    ChannelName: null,
    ChatID: null,
    AlarmOption: null
  },
  setChannelInfo: (channelInfo) => {},
  chatID: 0
}

/**
 * @typedef { Object } SelectorProps
 * @property { function(channelInfo) } setChannelInfo
 * @property { number } chatID
 */

/**
 * @param { SelectorProps } props
 */
function ChannelSelector(props) {
  // props에서 필요한 변수들을 추출
  const { setChannelInfo, chatID } = props;

  // 백엔드 서버 응답, 채널 정보 목록을 상태로 관리
  const [response, setResponse] = useState(null);
  const [channelInfoList, setChannelInfoList] = useState([]);

  // 선택된 채널이 변경되었을 때 호출되는 이벤트 핸들러
  const handleChange = (event) => {
    // 선택된 채널 정보를 부모 컴포넌트에 전달
    setChannelInfo(channelInfoList[event.target.value]);
  }

  // 채팅 ID가 업데이트되면 채널 정보를 요청
  useEffect(() => {
    if (chatID !== null) {
      const getChannelInfo = getInfoFunction(
        `/database/channelinfo?chat_id=${chatID}`,
        setResponse
      );
      
      // 정보 요청 함수 실행
      getChannelInfo();
    }
  }, [chatID]);

  // 서버 응답 도착 시 채널 정보 목록 업데이트
  useEffect(() => {
    if (response !== null) {
      setChannelInfoList(response['channel_info']);

      // 응답 기록 초기화
      setResponse(null);
    }
  }, [response]);
  
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>채널명</InputLabel>
      <Select onChange={handleChange}>
        {
          // 채널 정보 목록을 매핑하여 각 채널을 메뉴 아이템으로 생성
          channelInfoList.map((channelInfo, index) => 
            <MenuItem key={index} value={index}>
              {channelInfo['ChannelName']}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
}

ChannelSelector.defaultProps = {
  setChannelInfo: (channelInfo) => {},
  chatID: 0
}

export default ChannelSelectAccordion;