import React, { useState, useEffect, useContext, useMemo } from 'react';

import {
  FormControl, RadioGroup, Radio, FormControlLabel, InputLabel,
  Select, MenuItem, Stack, Autocomplete, TextField
} from '@mui/material';

import { get } from '../util/util';

// AccordionPanel 컴포넌트의 setDisplayText 함수를 사용할 수 있는 컨텍스트
import { displayTextContext } from './AccordionPanel';

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

/*
  ChannelSelectPanelContent(function setValue(number channelID)): 채널을 선택하는 컴포넌트
    function setValue(number channelID): 상위 컴포넌트에서 전달받는 세터 함수
      number channelID: 선택한 채널의 ID
*/

/**
 * @typedef { Object } ChannelSelectPanelContentProps
 * @property { function } setValue
 */

/**
 * @param { ChannelSelectPanelContentProps } props
 */
function ChannelSelectPanelContent(props) {
  const { setValue: setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);

  const channelList = useFetchChannel(6069272927);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>채널명</InputLabel>
      <Select
        defaultValue=''
        label='채널명'
        onChange={(event) => {
          const selectedChannel = channelList[event.target.value]

          setDisplayedText(selectedChannel.name);
          setValue(selectedChannel.id)
        }} >
        {
          // 채널 정보 목록을 매핑하여 각 채널을 메뉴 아이템으로 생성
          channelList.map((channel, index) => 
            <MenuItem key={index} value={index}>
              {channel.name}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
}

ChannelSelectPanelContent.defaultValue = {
  setValue: (value) => {}
};

/*
  AlarmTypeSelectPanelContent(function setValue(string alarmType)): 알림 유형을 선택하는 컴포넌트
    function setValue(string alarmType): 상위 컴포넌트에서 전달받는 세터 함수
      string alarmType: 선택한 알림 유형
*/

/**
 * @typedef { Object } AlarmTypeSelectPanelContent
 * @property { function } setValue
 */

/**
 * @param { AlarmTypeSelectPanelContent } props 
 */
function AlarmTypeSelectPanelContent(props) {
  const { setValue: setValue } = props;

  const { setDisplayedText } = useContext(displayTextContext);

  return (
    <FormControl>
      <RadioGroup onChange={(event) => {
        setDisplayedText(event.currentTarget.value);
      }}>
        <FormControlLabel value='체결량 알림' control={<Radio />} label='체결량 알림' />
        <FormControlLabel value='고래 알림' control={<Radio />} label='고래 알림' />
      </RadioGroup>
    </FormControl>
  );
}

AlarmTypeSelectPanelContent.defaultValue = {
  setValue: (value) => {}
};

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

  const {
    exchangeList: exchangeList, setSelectedExchangeIndex: selectExchange,
    currencyList: currencyList, setSelectedCurrencyIndex: selectCurrency,
    quoteSymbolList: quoteSymbolList, setSelectedQuoteSymbolIndex: selectQuoteSymbol,
    selectedItem: selectedItem
   } = useFetchItem();

  // 거래소 선택 시 실행되는 함수
  const onExchangeSelectChange = (event) => {
    // 종목 선택 컴포넌트 입력 값 및 선택한 종목 정보 초기화
    setCurrencyComboBoxKey(`${event.target.value}-currency`);
    selectCurrency(null);

    // 시세 화폐 선택 컴포넌트 입력 값 및 선택한 시세 화폐 정보 초기화
    setQuoteSymbolComboBoxKey(`currency-quote`);
    selectQuoteSymbol(null);

    // 선택한 거래소 인덱스를 업데이트해 종목 정보 요청
    selectExchange(event.target.value);
  }

  // 종목 선택 시 실행되는 함수
  const onCurrencySelectChange = (event, option) => {
    if (option !== null) {
      // 시세 화폐 선택 컴포넌트 입력 값 및 선택한 시세 화폐 정보 초기화
      setQuoteSymbolComboBoxKey(`${option.index}-quote`);
      selectQuoteSymbol(null);

      // 선택한 종목 인덱스를 업데이트해 시세 화폐 정보 요청
      selectCurrency(option.index);
    }
  }

  // 시세 화폐 선택 시 실행되는 함수
  const onQuoteSymbolSelectChange = (event, option) => {
    if (option !== null) {
      // 선택한 시세 화폐 인덱스를 업데이트해 최종 종목 정보 업데이트
      selectQuoteSymbol(option.index);

      // 상위 컴포넌트에 최종 선택한 종목 정보 업데이트
      setValue(selectedItem); <--- 에러

      // 패널을 닫았을 때 표시될 값 업데이트
      setDisplayedText(`${selectedItem.baseSymbol}/${selectedItem.quoteSymbol}(${selectedItem.exchange.name})`);
    }
  }

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
          {
            exchangeList.map((exchange) => 
              <MenuItem key={exchange.id} value={exchange.index}>
                {exchange.name}
              </MenuItem>
            )
          }
        </Select>
      </FormControl>
      <Autocomplete
        id='currency-combo-box'
        key={currencyComboBoxKey}
        sx={{ width: 200 }}
        options={currencyList}
        getOptionLabel={option => option.symbol}
        renderInput={(params) => <TextField {...params} label='종목' />}
        onChange={onCurrencySelectChange}
      />
      <Autocomplete
        id='quote-symbol-combo-box'
        key={quoteSymbolComboBoxKey}
        sx={{ width: 200 }}
        options={quoteSymbolList}
        getOptionLabel={option => option.symbol}
        renderInput={(params) => <TextField {...params} label='시세 화폐' />}
        onChange={onQuoteSymbolSelectChange}
      />
    </Stack>
  );
}

ItemSelectPanelContent.defaultProps = {
  setValue: (value) => {}
};

/*
  function useFetchChannel(number chatID): 백엔드 서버에서 채널 정보를 요청하는 훅
    number chatID: 요청할 채널의 관리자 역할을 하는 채팅 ID

    return Channel[] channelList: 채널 목록
*/

/**
 * @typedef { Object } Channel
 * @property { number } id
 * @property { string } name
 * @property { number } chatID
 * @property { boolean } alarmOption
 */

/**
 * @param { number } chatID 
 * @returns { Channel[] } channelList
 */
function useFetchChannel(chatID) {
  const alertError = (error) => {
    console.error(error);
  };

  const [response, setResponse] = useState(null);

  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    get(`/database/channelinfo?chat_id=${chatID}`, (response) => {
      setChannelList(response.data['channel_info'].map((channel, index) => (
          {
            id: channel['ChannelID'],
            name: channel['ChannelName'],
            chatID: channel['ChatID'],
            alarmOption: channel['AlarmOption']
          }
        ))
      );
    }, alertError);
  }, [chatID]);

  return channelList;
}

/*
  function useFetchItem(): 백엔드 서버에서 선택에 따라 거래소, 종목, 시세 화폐 정보를 요청하는 훅
    return Object useFetchItem: 정보를 요청하고 최종 선택된 종목에 접근할 수 있는 세터 함수와 변수들
*/

/**
 * @typedef { Object } Exchange
 * @property { number } id
 * @property { string } name
 * @property { string } endpoint
 */
/**
 * @typedef { Object } Currency
 * @property { string } symbol
 * @property { number } index
 */
/**
 * @typedef { Object } Item
 * @property { Exchange } exchange
 * @property { string } baseSymbol
 * @property { string } quoteSymbol
 */
/**
 * @typedef { Object } useFetchItem
 * @property { Exchange[] } exchangeList
 * @property { function } setSelectedExchangeIndex
 * @property { Currency[] } currencyList
 * @property { function } setSelectedCurrencyIndex
 * @property { Currency[] } quoteSymbolList
 * @property { function } setSelectedQuoteSymbolIndex
 * @property { Item } selectedItemInfo
 */

/**
 * @returns { Object } 
 */
function useFetchItem() {
  const alertError = (error) => {
    console.error(error);
  };

  // 백엔드 서버에서 전송한 거래소, 종목, 시세 화폐 정보 목록
  const [exchangeList, setExchangeList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [quoteSymbolList, setQuoteSymbolList] = useState([]);

  // 선택한 거래소, 종목, 시세 화폐의 인덱스
  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState(null);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(null);
  const [selectedQuoteSymbolIndex, setSelectedQuoteSymbolIndex] = useState(null);

  // 최종적으로 선택한 종목
  const [selectedItem, setSelectedItem] = useState(null);

  // 거래소 정보를 요청하기 위한 엔드포인트
  const endpoint = useMemo(() => {
    if (exchangeList !== null && selectedExchangeIndex !== null) {
      return exchangeList[selectedExchangeIndex].endpoint;
    } else return null;
  }, [selectedExchangeIndex]);

  // 거래소 정보 목록 요청
  useEffect(() => {
    get(`/database/exchangeinfo`, (response) => {
      setExchangeList(response.data['exchange_info'].map((exchangeInfo, index) => ({
          id: exchangeInfo['ExchangeID'],
          name: exchangeInfo['ExchangeName'],
          endpoint: exchangeInfo['ExchangeEndpoint'],
          index: index
        }))
      );
    }, alertError);
  }, []);

  // 선택한 거래소 변경 시 종목 정보 목록 요청
  useEffect(() => {
    if (selectedExchangeIndex !== null) {
      // 시세 화폐 목록 초기화
      setQuoteSymbolList([]);

      get(`${endpoint}/currencylist`, (response) => {
        setCurrencyList(response.data['currency_info'].map((currencyInfo, index) => ({
            symbol: currencyInfo['CurrencySymbol'],
            index: index
          }))
        );
      }, alertError);
    }
  }, [selectedExchangeIndex]);

  // 선택한 종목 변경 시 해당 종목의 시세 화폐 목록 요청
  useEffect(() => {
    if (selectedCurrencyIndex !== null) {
      const symbol = currencyList[selectedCurrencyIndex].symbol;

      get(`${endpoint}/itemlist?base_symbol=${symbol}`, (response) => {
        setQuoteSymbolList(response.data['item_info'].map((itemInfo, index) => ({
            symbol: itemInfo['QuoteSymbol'],
            index: index
          }))
        );
      }, alertError);
    }
  }, [selectedCurrencyIndex]);

  // 선택한 시세 화폐 변경 시 최종 선택 종목 정보 업데이트
  useEffect(() => {
    if (selectedQuoteSymbolIndex !== null) {
      setSelectedItem({
        exchange: exchangeList[selectedExchangeIndex],
        baseSymbol: currencyList[selectedCurrencyIndex].symbol,
        quoteSymbol: quoteSymbolList[selectedQuoteSymbolIndex].symbol
      });
    }
  }, [selectedQuoteSymbolIndex]);

  // 선택한 거래소 또는 종목 변경 시 최종 선택 종목 정보 초기화
  useEffect(() => {
    setSelectedItem(null);
  }, [selectedExchangeIndex, selectedCurrencyIndex]);

  return {
    exchangeList, setSelectedExchangeIndex,
    currencyList, setSelectedCurrencyIndex,
    quoteSymbolList, setSelectedQuoteSymbolIndex,
    selectedItem
  };
}

export { ChatTypeSelectPanelContent, ChannelSelectPanelContent, AlarmTypeSelectPanelContent, ItemSelectPanelContent };