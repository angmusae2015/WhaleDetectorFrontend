import React, { useState, useEffect } from 'react';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Box, TextField, InputAdornment, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getInfoFunction } from '../util/util';

/**
 * @typedef { Object } AccordionProps
 * @property { Object } accordionProps
 * @property { function(number) } setChannelID
 */

/**
 * @param { AccordionProps } props
 */
function LinkInputAccordion(props) {
  const { accordionProps, setChannelID } = props;

  // 입력한 채널 링크, 백엔드 서버 응답, 응답으로 받은 채널 ID를 상태로 관리
  const [channelLink, setChannelLink] = useState("");
  const [response, setResponse] = useState(null);
  const [id, setID] = useState(null);

  // 백엔드 서버에서 받은 응답 도착 시 실행되는 효과 함수
  useEffect(() => {
    if (response !== null) {
      if ('channel_id' in response) {
        // 채널 ID 도착 시 해당 ID로 id 및 상위 컴포넌트의 channelID 상태 설정
        setID(response['channel_id']);
        setChannelID(response['channel_id']);
      } else {
        // 에러 도착 시 false로 id 상태 설정 및 상위 컴포넌트의 channelID 상태 초기화
        setID(false);
        setChannelID(null);
      }
      // 응답 기록 초기화
      setResponse(null);
    }
  }, [response]);

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
    >
      <Typography>
        {"채널 ID 찾기" + (!accordionProps.expanded && Boolean(id) ? ": 확인됨" : "")}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box
        sx={{
          display: 'flex',
        }} >
        <Box
          sx={{
            width: '75%'
          }} >
          <LinkInput
            setChannelID={setChannelID}
            inputProps={{
              // 채널 ID가 정상적으로 확인되지 않았을 경우 에러 표시
              error: (id === null) ? false : !(id),
              helperText: (id !== null && !Boolean(id)) ? "잘못된 초대 링크입니다. 주소를 확인해주세요." : (id !== null ? "채널을 확인했습니다!" : ""),
              // 채널 ID가 정상적으로 확인되었을 경우 색을 success로 표시
              color: Boolean(id) ? "success" : "",
              focused: Boolean(id),
              // value를 channelLink 상태로 관리
              value: channelLink,
              onChange: (event) => {
                const value = event.target.value;
                // URL에서 채널 링크 부분을 추출
                setChannelLink(value.replace('https://t.me/', ''));
              }
            }} />
        </Box>
        <Button
          disabled={channelLink === ""}
          variant="contained"
          onClick={() => {
            // 백엔드 서버를 통해 채널 ID 요청
            const getChannelIDFunc = getInfoFunction(`/telegram/check-channel-id?channel_link=${channelLink}`, setResponse);
            getChannelIDFunc();
          }}
          sx={{
            ml: 1,
            width: '25%'
          }} >
          확인하기
        </Button>
      </Box>
    </AccordionDetails>
    </Accordion>
  )
}

LinkInputAccordion.defaultProps = {
  accordionProps: {},
  setChannelID: (channelID) => {}
};

/**
 * @typedef { Object } InputProps
 * @property { Object } inputProps
 * @property { function(number) } setChannelID
 */

/**
 * @param { InputProps } props 
 */
function LinkInput(props) {
  const { inputProps, setChannelID } = props;

  return (
    <div>
      <TextField
        {...inputProps}
        fullWidth={true}
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">https://t.me/</InputAdornment>,
        }} ></TextField>
    </div>
  )
}

LinkInput.defaultProps = {
  inputProps: {},
  setChannelID: (channelID) => {}
};

export default LinkInputAccordion;