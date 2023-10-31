import { get } from 'util/util';
import { createResponseHandler } from 'objects';

export function Exchange(id, name) {
  this.id = id;
  this.name = name;

  this.getCurrencies = () => {
    const mapper = (currencyInfo) => {
      const { symbol, englishName, koreanName } = currencyInfo;
      
      return symbol;
    }

    const handleResponse = createResponseHandler('currencies', mapper);
    const url = `/exchanges/${this.id}/currencies`;

    return get(url).then(handleResponse);
  };

  this.getItems = (baseSymbol) => {
    const mapper = parseItem;

    const handleResponse = createResponseHandler('items', mapper);
    const url = `/exchanges/${this.id}/items?base_symbol=${baseSymbol}`;

    return get(url).then(handleResponse);
  };
}

export function parseExchange(exchangeInfo) {
  const { 
    id: id, 
    name: name 
  } = exchangeInfo;

  return new Exchange(id, name);
}

export function getExchanges() {
  const mapper = parseExchange;

  const handleResponse = createResponseHandler('exchanges', mapper);
  const url = `/exchanges`;
  
  return get(url).then(handleResponse);
}

export function Item(exchange, baseSymbol, quoteSymbol) {
  this.exchange = exchange;
  this.baseSymbol = baseSymbol;
  this.quoteSymbol = quoteSymbol;
}

export function parseItem(itemInfo) {
  const { 
    exchange: exchangeInfo, 
    base_symbol: baseSymbol, 
    quote_symbol: quoteSymbol 
  } = itemInfo;
  const exchange = parseExchange(exchangeInfo);

  return new Item(exchange, baseSymbol, quoteSymbol);
}