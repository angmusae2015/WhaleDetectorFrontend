import React, { useContext, useEffect, useState } from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

import { post } from 'util/util';

import { alarmInfoContext } from './Page';

function PostButton(props) {
  const {
    chat,
    isChannel,
    channel,
    alarmType,
    item,
    quantity
  } = useContext(alarmInfoContext);

  // 버튼의 비활성 여부를 저장하는 상태
  const [disabled, setDisabled] = useState(true);

  // 알림 설정 완료 창 활성 여부를 저장하는 상태
  const [openDialog, setOpenDialog] = useState(false);

  // 알림을 백엔드 서버에 등록
  const postAlarm = () => {
    var endpoint = `/chats/${chat.id}`;

    if (isChannel) endpoint += `/channels/${channel.id}`;

    endpoint += '/alarms'

    const params = {
      type: alarmType,
      exchange_id: item.exchange.id,
      base_symbol: item.baseSymbol,
      quote_symbol: item.quoteSymbol,
      quantity: quantity
    };

    const afterPost = () => {
      setOpenDialog(true);
    };

    // 버튼 비활성화
    setDisabled(true);

    post(endpoint, params).then(afterPost);
  }

  // 알림 설정 값 변경 시 버튼 비활성 여부를 설정하는 함수
  const onValueChange = () => {
    // 채팅ID 또는 종목, 가격이 설정되지 않았을 경우 버튼 비활성화
    if (!chat || !item || !quantity) {
      setDisabled(true);
      return;
    }

    // 채널 여부 또는 알림 유형이 설정되지 않았을 경우 버튼 비활성화
    if (isChannel === null || alarmType === null) {
      setDisabled(true);
      return;
    }

    // 채팅 유형이 채널이고 채널이 선택되지 않았을 경우 버튼 비활성화
    if (isChannel && channel === null) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }

  // 알림 설정 값 변경 시 실행되는 효과 함수
  useEffect(onValueChange, [chat, isChannel, channel, alarmType, item, quantity]);

  return (
    <div>
      <Dialog
        open={openDialog} >
        <DialogTitle>
          알림 추가 완료!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            알림이 성공적으로 추가되었습니다.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Button
        disabled={disabled}
        variant='contained'
        sx={{mt: 1}}
        onClick={postAlarm} >
        알림 설정
      </Button>
    </div>
  );
}

export default PostButton;