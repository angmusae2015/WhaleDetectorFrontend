import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NameInputAccordion from './NameInputAccordion';
import LinkInputAccordion from './LinkInputAccordion';

import { postFunction } from '../util/util';

function AddChannelPage() {
  // 채팅 및 채널 관련 상태 초기화
  const [chatID, setChatID] = useState(null);
  const [name, setName] = useState("");
  const [channelID, setChannelID] = useState(null);

  // 아코디언 패널 접힘 상태 초기화
  const [expanded, setExpanded] = useState(false);
  
  // 현재 페이지의 URL 파라미터 정보 가져오기
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 페이지가 로드될 때 chatID 상태 설정
  useEffect(() => {
    setChatID(queryParams.get('chat_id'));
  }, []);

  // 아코디언 패널이 접히거나 열릴 때 실행되는 함수
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel: false);
  };

  return (
    <div>
      <NameInputAccordion
        accordionProps={{
          expanded: expanded === 'nameInputPanel',
          onChange: handleChange('nameInputPanel')
        }}
        name={name}
        setName={setName} />
      <LinkInputAccordion
        accordionProps={{
          expanded: expanded === "linkInputPanel",
          onChange: handleChange('linkInputPanel')
        }}
        setChannelID={setChannelID}
        />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }} >
        <PostButton channelInfo={{
          channelID: channelID,
          name: name,
          chatID: chatID
        }} />
      </Box>
    </div>
  );
}

/**
 * @typedef { Object } PostButtonProps
 * @property { Object } channelInfo
 */

/**
 * @param { PostButtonProps } props
 */
function PostButton(props) {
  const { channelID, name, chatID } = props.channelInfo;

  const [disableButton, setDisableButton] = useState(true);
  const [buttonText, setButtonText] = useState("채널 등록");

  const postChannel = () => {
    const endpoint = "/database/channel/add";
    const params = {
      channel_id: channelID,
      name: name,
      chat_id: chatID
    };

    setDisableButton(true);

    const postChannelFunc = postFunction(endpoint, params, () => {
      setButtonText("완료!");
    }, () => {
      setDisableButton(false);
    });
    postChannelFunc();    
  }

  // 채널 ID 확인 시 알림 설정 버튼 활성화
  useEffect(() => {
    setDisableButton(name === "" && !channelID);
  }, [channelID]);

  return (
    <Button
      disabled={disableButton}
      variant="contained"
      sx={{mt: 1}}
      onClick={postChannel} >
      {buttonText}
    </Button>
  );
}

export default AddChannelPage;