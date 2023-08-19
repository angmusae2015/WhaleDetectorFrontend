import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'

/**
 * @typedef { Object } AccordionProps
 * @property { Object } accordionProps
 * @property { string } alarmType
 * @property { function(string) } setAlarmType
 */

/**
 * @param { AccordionProps } props
 */
function AlarmTypeSelectAccordion(props) {
  const { accordionProps, alarmType, setAlarmType } = props;

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          {"알림 유형" + (!accordionProps.expanded ? `${alarmType === "TickAlarm" ? ": 체결량 알림" : ": 고래 알림"}` : "")}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AlarmTypeSelector setAlarmType={setAlarmType} />
      </AccordionDetails>
    </Accordion>
  );
}

AlarmTypeSelectAccordion.defaultProps = {
  accordionProps: {},
  setAlarmType: (alarmType) => {}
}

/**
 * @typedef { Object } SelectorProps 
 * @property { function(string) } setAlarmType
 */

/**
 * @param { SelectorProps } props
 */
function AlarmTypeSelector(props) {
  // props에서 필요한 변수들을 추출
  const { setAlarmType } = props;

  // 선택된 알림 유형이 변경되었을 때 호출되는 이벤트 핸들러
  const handleChange = (event) => {
    // 선택된 알림 유형을 부모 컴포넌트에 전달
    setAlarmType(event.target.value);
  }

  return (
    <FormControl>
      <RadioGroup onChange={handleChange}>
        <FormControlLabel value="TickAlarm" control={<Radio />} label="체결량 알림" />
        <FormControlLabel value="WhaleAlarm" control={<Radio />} label="고래 알림" />
      </RadioGroup>
    </FormControl>
  );
}

AlarmTypeSelector.defaultProps = {
  setAlarmType: (alarmType) => {}
}

export default AlarmTypeSelectAccordion;