import React, { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import getInfoFunction from '../util/util';

/**
 * @typedef { Object } AccordionProps
 * @property { Object } accordionProps
 * @property { function(Object) } setItemInfo
 */

/**
 * @param { AccordionProps } props
 */
function ItemSelectAccordion(props) {
  const { accordionProps, setItemInfo } = props;

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>종목</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ItemSelector setItemInfo={setItemInfo} />
      </AccordionDetails>
    </Accordion>
  );
}

ItemSelectAccordion.defaultProps = {
  accordionProps: {},
  setItemInfo: (itemInfo) => {}
}

/**
 * @typedef { Object } SelectorProps 
 * @property { function(Object) } setItemInfo
 */

/**
 * @param { SelectorProps } props
 */
function ItemSelector(props) {
  // props에서 필요한 변수들을 추출
  const { setItemInfo } = props;

  // 거래소, 종목, 시세 화폐 정보 목록을 상태로 관리
  const [exchangeInfoList, setExchangeInfoList] = useState([]);
  const [currencyInfoList, setCurrencyInfoList] = useState([]);
  const [itemInfoList, setItemInfoList] = useState([]);

  // 선택한 거래소의 인덱스를 상태로 관리
  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState(null);

  // 선택된 거래소가 변경되었을 때 호출되는 이벤트 핸들러
  const handleExchangeChange = (event) => {
    // 선택한 거래소의 인덱스를 저장
    setSelectedExchangeIndex(event.target.value);

    // 이전 거래소의 종목, 시세 화폐 정보 목록 및 자동 완성 컴포넌트 값 초기화
    setCurrencyInfoList([]);
    setItemInfoList([]);
    
    // 종목 정보 요청 함수 및 실행
    const endpoint = exchangeInfoList[event.target.value]['ExchangeEndpoint'];
    const getCurrencyInfo = getInfoFunction(
      `${endpoint}/currencylist`,
      setCurrencyInfoList
    );

    getCurrencyInfo();
  }

  // 선택된 종목이 변경되었을 때 호출되는 이벤트 핸들러
  const handleCurrencyChange = (object, value) => {
    // 이전 종목의 시세 화폐 정보 목록 및 자동 완성 컴포넌트 값 초기화
    setItemInfoList([]);

    if (value !== null) {
      // 시세 화페 정보 요청 함수 및 실행
      const endpoint = exchangeInfoList[selectedExchangeIndex]['ExchangeEndpoint'];
      const getItemInfo = getInfoFunction(
        `${endpoint}/itemlist?base_symbol=${value.symbol}`,
        setItemInfoList
      );

      getItemInfo();
    }
  }

  // 선택된 시세 화폐가 변경되었을 때 호출되는 이벤트 핸들러
  const handleItemChange = (object, value) => {
    if (value !== null) {
      const selectedItemInfo = itemInfoList[value.index];

      // 선택된 종목 정보를 부모 컴포넌트에 전달
      setItemInfo({
        ExchangeID: selectedExchangeIndex + 1,
        BaseSymbol: selectedItemInfo['BaseSymbol'],
        QuoteSymbol: selectedItemInfo['QuoteSymbol']
      });
    }
  }

  // 컴포넌트가 처음 마운트될 때 거래소 정보 요청
  useEffect(() => {
    const getExchangeInfo = getInfoFunction('/database/exchangeinfo', setExchangeInfoList);

    // 정보 요청 함수 실행
    getExchangeInfo();
  }, []);
/* sx={{ width: 600 }} */
  return (
    <div>
      <Stack direction="row" spacing={1} >
        <FormControl sx={{ width: 200 }}>
          <InputLabel>거래소</InputLabel>
          <Select
            id="exchange-select"
            onChange={handleExchangeChange}
          >
            {
              // 거래소 정보 목록을 매핑하여 각 거래소를 메뉴 아이템으로 생성
              exchangeInfoList.map((exchangeInfo, index) => 
                <MenuItem key={index} value={index}>
                  {exchangeInfo['ExchangeName']}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
        <Autocomplete
          id="currency-combo-box"
          // 키를 리셋하여 거래소 선택 시 컴포넌트 초기화
          key={selectedExchangeIndex}
          sx={{ width: 200 }}
          options={
            currencyInfoList.map((currencyInfo) => ({
              symbol: currencyInfo['CurrencySymbol']
            }))
          }
          getOptionLabel={option => option.symbol}
          renderInput={(params) => <TextField {...params} label="종목" />}
          onChange={handleCurrencyChange}
        />
        <Autocomplete
          id="quote-combo-box"
          // 키를 리셋하여 거래소 또는 종목 선택 시 컴포넌트 초기화
          key={itemInfoList.length + 1000}
          sx={{ width: 200 }}
          options={
            itemInfoList.map((itemInfo, index) => ({
              symbol: itemInfo['QuoteSymbol'],
              index: index
            }))
          }
          getOptionLabel={option => option.symbol}
          renderInput={(params) => <TextField {...params} label="시세 화폐" />}
          onChange={handleItemChange}
        />
      </Stack>
    </div>
  );
}

ItemSelector.defaultProps = {
  setItemInfo: (itemInfo) => {}
}

export default ItemSelectAccordion;