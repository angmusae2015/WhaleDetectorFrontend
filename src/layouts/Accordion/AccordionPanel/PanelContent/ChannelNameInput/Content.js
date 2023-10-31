import React, { useEffect, useState, useContext } from 'react';

import { TextField } from '@mui/material';

// AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

/*
  ChannelNameInputPanelContent(function setValue(string name)): 채널 이름을 입력하는 컴포넌트
    function setValue(string name): 상위 컴포넌트에서 전달받는 세터 함수
      string name: 입력한 이름
*/

/**
 * @typedef { Object } ChannelNameInputPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { ChannelNameInputPanelContentProps } props
 */
function ChannelNameInputPanelContent(props) {
  const { setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);

  // 입력 값 변경 시 실행할 함수
  const onChange = (event) => {
    const value = event.target.value;

    // 아무것도 입력하지 않았을 때
    if (value === '') {
      // 상위 컴포넌트와 패널을 닫았을 때 표시할 값으로 null 전달
      setValue(null);
      setDisplayedText(null);
      return;
    }

    // 상위 컴포넌트에 입력값 전달
    setValue(value);
    setDisplayedText(value);
  };

  return (
    <TextField
      label='채널 이름'
      onChange={onChange}
    />
  );
}

export default ChannelNameInputPanelContent;