import React, { useEffect, useState, useContext } from 'react';

import { NumericFormat } from 'react-number-format';
import { InputAdornment, TextField } from '@mui/material';

// AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

/*
  QuantitySelectPanelContent(string symbol, function setValue(number quantity)): 가격을 선택하는 컴포넌트
    string symbol: 가격 단위
    function setValue(number quantity): 상위 컴포넌트에서 전달받는 세터 함수
      number quantity: 선택한 가격
*/

/**
 * @typedef { Object } QuantitySelectPanelContentProps
 * @property { string } symbol
 * @property { function } setValue
 */

/**
 * @param { QuantitySelectPanelContentProps } props
 */
function QuantityInputPanelContent(props) {
  const { symbol: symbol, setValue: setValue } = props;

  const [displayedQuantity, setDisplayedQuantity] = useState(null);

  // 컴포넌트에 값이 입력되었을 때 실행할 함수
  const handleValueChange = (values) => {
    setDisplayedQuantity(values.floatValue);
  };

  // displayedQuantity 값 변경 시 호출되는 효과 함수
  useEffect(() => {
    if (displayedQuantity === null) return;

    // 상위 컴포넌트에 입력 값 업데이트
    setValue(displayedQuantity);
  }, [displayedQuantity]);

  return (
    <NumericFormat
      customInput={TextField}
      value={displayedQuantity}
      thousandSeparator={true}
      onValueChange={handleValueChange}
      label="가격"
      InputProps={{
        error: displayedQuantity !== null && displayedQuantity <= 0,
        startAdornment: <InputAdornment position='start'>{symbol}</InputAdornment>,
        type: 'text'
      }}
    />
  );
}

QuantityInputPanelContent.defaultProps = {
  symbol: '',
  setValue: (value) => {}
};

export default QuantityInputPanelContent;