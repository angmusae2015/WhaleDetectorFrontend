import React, { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

/**
 * @typedef { Object } itemInfo
 * @property { number } ExchangeID
 * @property { string } BaseSymbol
 * @property { string } QuoteSymbol
 */

/**
 * @typedef { Object } AccordionProps
 * @property { Object } accordionProps
 * @property { string } alarmType
 * @property { itemInfo } itemInfo
 * @property { function(number) } setQuantity
 * @property { function } onChange
 */

/**
 * @param { AccordionProps } props
 */
function QuantityInputAccordion(props) {
  const { accordionProps, alarmType, itemInfo, setQuantity } = props;

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>가격</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <QuantityInput alarmType={alarmType} itemInfo={itemInfo} setQuantity={setQuantity} />
      </AccordionDetails>
    </Accordion>
  );
}

QuantityInputAccordion.defaultProps = {
  accordionProps: {},
  alarmType: "",
  itemInfo: {},
  setQuantity: (quantity) => {}
}

/**
 * @typedef { Object } InputProps
 * @property { string } alarmType
 * @property { itemInfo } itemInfo
 * @property { function(number) } setQuantity
 */

/**
 * @param { InputProps } props
 */
function QuantityInput(props) {
  // props에서 필요한 변수들을 추출
  const { alarmType, itemInfo, setQuantity } = props;

  const [displayedQuantity, setDisplayedQuantity] = useState(null);

  var symbol = "";
  if (itemInfo !== null) {
    if (alarmType === "TickAlarm") {
      symbol = itemInfo['BaseSymbol'];
    } else if (alarmType === "WhaleAlarm") {
      symbol = itemInfo['QuoteSymbol'];
    }
  }

  // 입력 값 변경 시 부모 컴포넌트로 전달
  useEffect(() => {
    if (displayedQuantity !== null) {
      setQuantity(displayedQuantity);
    }
  }, [displayedQuantity]);

  return (
    <div>
      <NumericFormat
        customInput={TextField}
        value={displayedQuantity}
        thousandSeparator={true}
        onValueChange={(values) => {
          setDisplayedQuantity(values.floatValue);
        }}
        label="가격"
        InputProps={{
          startAdornment: <InputAdornment position='start'>{symbol}</InputAdornment>
        }}
        inputProps={{
          type: 'text'
        }}
      />
    </div>
  )
}

QuantityInput.defaultProps = {
  alarmType: "",
  itemInfo: {},
  setQuantity: (quantity) => {}
}

export default QuantityInputAccordion;