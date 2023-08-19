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
 * @property { boolean } isChannel
 * @property { function(boolean) } setIsChannel
 */

/**
 * @param { AccordionProps } props 
 */
function ChatTypeSelectAccordion(props) {
  const { accordionProps, isChannel, setIsChannel } = props;

  return (
    <Accordion {...accordionProps} >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          {"채팅 유형" + (!accordionProps.expanded && isChannel !== null ? `: ${isChannel ? "채널" : "개인 채팅"}` : "")}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ChatTypeSelector setIsChannel={setIsChannel} />
      </AccordionDetails>
    </Accordion>
  );
}

ChatTypeSelectAccordion.defaultProps = {
  accordionProps: {},
  isChannel: null,
  setIsChannel: (isChannel) => {}
}

/**
 * @typedef { Object } SelectorProps
 * @property { function(boolean) } setIsChannel
 */

/**
 * @param { SelectorProps } props 
 */
function ChatTypeSelector(props) {
  // props에서 필요한 변수들을 추출
  const { setIsChannel } = props;

  // 선택된 채팅 유형이 변경되었을 때 호출되는 이벤트 핸들러
  const handleChange = (event) => {
    // 선택된 채팅 유형을 부모 컴포넌트에 전달
    if (event.currentTarget.value === "false") {
      setIsChannel(false);
    } else if (event.currentTarget.value === "true") {
      setIsChannel(true);
    }
    
  }

  return (
    <FormControl>
      <RadioGroup onChange={handleChange}>
        <FormControlLabel value={false} control={<Radio />} label="개인 채팅" />
        <FormControlLabel value={true} control={<Radio />} label="채널" />
      </RadioGroup>
    </FormControl>
  );
}

ChatTypeSelector.defaultProps = {
  setIsChannel: (isChannel) => {}
}

export default ChatTypeSelectAccordion;