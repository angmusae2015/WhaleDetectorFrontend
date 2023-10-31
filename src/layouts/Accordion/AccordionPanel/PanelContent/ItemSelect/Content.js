import React, { useState, useEffect, useContext, useMemo } from 'react';

import {
  FormControl, InputLabel, Select, MenuItem, Stack, Autocomplete, TextField
} from '@mui/material';

import { getExchanges } from 'objects';


// AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from 'layouts/Accordion';

import { get } from 'util/util';

/*
  ItemSelectPanelContent(function setValue(Object item)): 거래소, 종목, 시세 화폐를 선택하는 컴포넌트
    function setValue(Object item): 상위 컴포넌트에서 전달받는 세터 함수
      Object item: 최종 선택한 종목 정보
*/

/**
 * @typedef { Object } ItemSelectPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { ItemSelectPanelContentProps } props
 */
function ItemSelectPanelContent(props) {
  const { setValue: setValue } = props;

  // AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
  const { setDisplayedText } = useContext(displayTextContext);

  // AutoComplete 컴포넌트의 입력 값을 초기화하기 위한 key 값을 저장하는 state
  const [currencyComboBoxKey, setCurrencyComboBoxKey] = useState('exchange-currency');
  const [quoteSymbolComboBoxKey, setQuoteSymbolComboBoxKey] = useState('currency-quote');

  /* const {
    exchangeList: exchangeList, setSelectedExchangeIndex: selectExchange,
    currencyList: currencyList, setSelectedCurrencyIndex: selectCurrency,
    quoteSymbolList: quoteSymbolList, setSelectedQuoteSymbolIndex: selectQuoteSymbol,
    selectedItem: selectedItem
   } = useFetchItem(); */

  const [exchangeList, setExchangeList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [itemList, setItemList] = useState([]);

  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState(null);

  useEffect(() => {getExchanges().then(setExchangeList)}, []);

  const renderExchangeMenuItemList = () => {
    const mapper = (exchange, index) => (
      <MenuItem key={`exchange-${exchange.id}`} value={index}>
        {exchange.name}
      </MenuItem>
    );

    const menuItemList = exchangeList.map(mapper);

    return menuItemList;
  };

  // 거래소 선택 시 실행되는 함수
  const onExchangeSelectChange = (event) => {
    const selectedIndex = event.target.value;
    const selectedExchange = exchangeList[selectedIndex];

    setSelectedExchangeIndex(selectedIndex);

    // 종목 선택 컴포넌트 입력 값 초기화
    setCurrencyComboBoxKey(`${selectedIndex}-currency`);

    // 시세 화폐 선택 컴포넌트 입력 값 초기화
    setQuoteSymbolComboBoxKey(`currency-quote`);

    // 선택한 종목 값 초기화
    setValue(null);
    setDisplayedText('');

    selectedExchange.getCurrencies().then(setCurrencyList);
  };

  // 종목 선택 시 실행되는 함수
  const onCurrencySelectChange = (event, symbol) => {
    // 시세 화폐 선택 컴포넌트 입력 값 초기화
    setQuoteSymbolComboBoxKey(`${symbol}-quote`);

    // 선택한 종목 값 초기화
    setValue(null);
    setDisplayedText('');

    const selectedExchange = exchangeList[selectedExchangeIndex];

    selectedExchange.getItems(symbol).then(setItemList);
  };

  // 시세 화폐 선택 시 실행되는 함수
  const onQuoteSymbolSelectChange = (event, item) => {
    setValue(item);

    const displayedText = `${item.baseSymbol}/${item.quoteSymbol}`;
    setDisplayedText(displayedText);
  };

  return (
    <Stack direction="row" spacing={1}>
      <FormControl sx={{ width: 200 }}>
        <InputLabel>거래소</InputLabel>
        <Select
          id='exchange-select'
          defaultValue=''
          label='거래소'
          onChange={onExchangeSelectChange}
        >
          {renderExchangeMenuItemList()}
        </Select>
      </FormControl>
      <Autocomplete
        id='currency-combo-box'
        key={currencyComboBoxKey}
        sx={{ width: 200 }}
        options={currencyList}
        getOptionLabel={symbol => symbol}
        renderInput={(params) => <TextField {...params} label='종목' />}
        onChange={onCurrencySelectChange}
      />
      <Autocomplete
        id='quote-symbol-combo-box'
        key={quoteSymbolComboBoxKey}
        sx={{ width: 200 }}
        options={itemList}
        getOptionLabel={item => item.quoteSymbol}
        renderInput={(params) => <TextField {...params} label='시세 화폐' />}
        onChange={onQuoteSymbolSelectChange}
      />
    </Stack>
  );
}

ItemSelectPanelContent.defaultProps = {
  setValue: (value) => {}
};

export default ItemSelectPanelContent;