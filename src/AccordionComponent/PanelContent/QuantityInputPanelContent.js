import React, { useEffect, useState, useContext } from 'react';

import { displayTextContext } from '../AccordionPanel';
import { NumericFormat } from 'react-number-format';
import { InputAdornment, TextField } from '@mui/material';

/**
 * @typedef { Object } Props
 * @property { string } symbol
 * @property { function } setValue
 */

/**
 * @param {Props} props
 */
function QuantityInputPanelContent(props) {
  const {symbol: symbol, setValue: setValue} = props;

  // AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
  const { setDisplayedText } = useContext(displayTextContext);


  const [displayedQuantity, setDisplayedQuantity] = useState(null);

  useEffect(() => {
    if (displayedQuantity !== null) {
      setDisplayedText(`${symbol} ${displayedQuantity}`);
    }
  });

  return (
    <NumericFormat
      customInput={TextField}
      value={displayedQuantity}
      thousandSeparator={true}
      onValueChange={(values) => {
        setDisplayedQuantity(values.floatValue);
        setValue(values.floatValue);
      }}
      label='가격'
      InputProps={{
        error: displayedQuantity !== null && displayedQuantity <= 0,
        startAdornment: <InputAdornment position='start'>{symbol}</InputAdornment>
      }}
      inputProps={{
        type:'text'
      }}
    />
  );
}

QuantityInputPanelContent.defaultProps = {
  symbol: '',
  setValue: (value) => {}
};

export default QuantityInputPanelContent;