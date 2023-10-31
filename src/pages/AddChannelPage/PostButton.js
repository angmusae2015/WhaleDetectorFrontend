import React, { useContext, useEffect, useState } from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

import { channelInfoContext } from './Page';

import { chatContext } from 'App';

function PostButton(props) {
  const { channelId, channelName } = useContext(channelInfoContext);
  const chat = useContext(chatContext);

  // 버튼의 비활성 여부를 저장하는 상태
  const [disabled, setDisabled] = useState(true);

  // 채널 등록 완료 창 활성 여부를 저장하는 상태
  const [openDialog, setOpenDialog] = useState(false);

  // 채널을 백엔드 서버에 등록
  const postChannel = () => {
    const afterPost = () => {
      setOpenDialog(true);
    };

    chat.postChannel(channelId, channelName)
      .then(afterPost)

    // 버튼 비활성화
    setDisabled(true);
  };

  // 채널 설정 값 변경 시 버튼 비활성 여부를 설정하는 함수
  const onValueChange = () => {
    // 채널 이름을 입력하지 않았거나 채널 ID가 확인되지 않았을 경우 버튼 비활성화
    if (!channelName || !channelId) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  };

  // 채널 설정 값 변경 시 실행되는 효과 함수
  useEffect(onValueChange, [chat, channelName, channelId]);

  return (
    <div>
      <Dialog
        open={openDialog} >
        <DialogTitle>
          채널 등록 완료!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            채널이 성공적으로 추가되었습니다.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Button
        disabled={disabled}
        variant='contained'
        sx={{mt: 1}}
        onClick={postChannel} >
        채널 등록
      </Button>
    </div>
  );
}

export default PostButton;