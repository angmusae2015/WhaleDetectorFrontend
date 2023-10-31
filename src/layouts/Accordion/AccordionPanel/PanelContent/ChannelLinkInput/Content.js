import React, { useEffect, useState, useContext } from 'react';

import { Box, TextField, InputAdornment, Button } from '@mui/material';

import { get } from 'util/util';

// AccordionPanel 컴포넌트의 setDisplayedText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

/*
  ChannelLinkInputPanelContent(function setValue(string name)): 채널 초대 링크를 입력하고 채널 ID를 확인하는 컴포넌트
    function setValue(number id): 상위 컴포넌트에서 전달받는 세터 함수
      number id: 채널 ID
*/

/**
 * @typedef { Object } ChannelLinkInputPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { ChannelLinkInputPanelContentProps } props
 */
function ChannelLinkInputPanelContent(props) {
  const { setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);

  const [channelLink, setChannelLink] = useState("");
  const [id, setId] = useState(null);

  // 입력 값 변경 시 실행할 함수
  const onChange = (event) => {
    const value = event.target.value;

    // 기록된 채널 ID 초기화
    setId(null);

    // 상위 컴포넌트에 저장된 채널 ID 초기화
    setValue(null);

    // 패널을 닫았을 때 표시할 텍스트 초기화
    setDisplayedText(null);

    // 입력한 URL에서 채널 링크 부분만 추출
    setChannelLink(value.replace('https://t.me/', ''));
  }

  // 채널 확인 버튼 클릭 시 실행할 함수
  const onClick = (event) => {
    const endpoint = `/telegram/get-channel-id?channel_link=${channelLink}`;

    // 성공적으로 채널 ID를 확인했을 경우 실행되는 함수
    const confirmChannel = (response) => {
      const id = response.data['channel_id'];
      setId(id);

      // 상위 컴포넌트로 채널 ID 전달
      setValue(id);

      // 패널을 닫았을 때 표시할 텍스트 설정
      setDisplayedText('확인됨');
    }

    // 채널 ID 확인에 실패했을 경우 실행되는 함수
    const onError = (error) => {
      setId(false);

      // 패널을 닫았을 때 표시할 텍스트 초기화
      setDisplayedText(null);
    }

    get(endpoint)
      .then(confirmChannel)
      .catch(onError);
  }

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '75%'}}>
        <TextField
          fullWidth={true}
          varient="standard"
          error={(id === null) ? false: !(id)}
          helperText={(id !== null && !(id)) ? "잘못된 초대 링크입니다. 주소를 확인해주세요." : (id !== null ? "채널을 확인했습니다!" : "")}
          color={id ? "success" : ""}
          focused={Boolean(id)}
          value={channelLink}
          onChange={onChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">https://t.me/</InputAdornment>
          }} />
      </Box>
      <Button
        disabled={channelLink === ""}
        variant="contained"
        sx={{ml: 1, width: '25%'}}
        onClick={onClick} >
        확인하기
      </Button>
    </Box>
  );
}

export default ChannelLinkInputPanelContent;