import React, { useContext } from 'react';

import {
  FormControl, RadioGroup, Radio, FormControlLabel
} from '@mui/material';

// AccordionPanel 컴포넌트의 setDisplayedText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

/*
  AlarmTypeSelectPanelContent(function setValue(string alarmType)): 알림 유형을 선택하는 컴포넌트
    function setValue(string alarmType): 상위 컴포넌트에서 전달받는 세터 함수
      string alarmType: 선택한 알림 유형
*/

/**
 * @typedef { Object } AlarmTypeSelectPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { AlarmTypeSelectPanelContentProps } props 
 */
function AlarmTypeSelectPanelContent(props) {
  const { setValue: setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);

  // 선택한 알림 유형 변경 시 실행되는 함수
  const onSelectChange = (event) => {
    const value = event.currentTarget.value;
    setDisplayedText(value);

    if (value === '체결량 알림') setValue('TickAlarm')
    else if (value === '고래 알림') setValue('WhaleAlarm');
  };

  return (
    <FormControl>
      <RadioGroup onChange={onSelectChange}>
        <FormControlLabel value='체결량 알림' control={<Radio />} label='체결량 알림' />
        <FormControlLabel value='고래 알림' control={<Radio />} label='고래 알림' />
      </RadioGroup>
    </FormControl>
  );
}

AlarmTypeSelectPanelContent.defaultValue = {
  setValue: (value) => {}
};

export default AlarmTypeSelectPanelContent;