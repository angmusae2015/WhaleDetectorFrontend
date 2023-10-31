import React, { useContext } from "react";

import {
  FormControl, RadioGroup, FormControlLabel, Radio
} from '@mui/material';

// AccordionPanel 컴포넌트의 setDisplayedText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

/*
  ChatTypeSelectPanelContent(function setValue(boolean isChannel)): 채팅 유형을 선택하는 컴포넌트
    function setValue(boolean isChannel): 상위 컴포넌트에서 전달받는 세터 함수
      boolean isChannel: 채널 여부, '채널' 선택 시 true, '개인 채팅' 선택 시 false
*/

/**
 * @typedef { Object } ChatTypeSelectPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { ChatTypeSelectPanelContentProps } props
 */
function ChatTypeSelectPanelContent(props) {
  const { setValue: setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);

  return (
    <FormControl>
      <RadioGroup onChange={(event) => {
        const value = event.currentTarget.value;

        setDisplayedText(value);
        setValue(value === '채널');
      }}>
        <FormControlLabel value='개인 채팅' control={<Radio />} label='개인 채팅' />
        <FormControlLabel value='채널' control={<Radio />} label='채널' />
      </RadioGroup>
    </FormControl>
  );
}
  
ChatTypeSelectPanelContent.defaultProps = {
  setValue: (value) => {}
};

export default ChatTypeSelectPanelContent;