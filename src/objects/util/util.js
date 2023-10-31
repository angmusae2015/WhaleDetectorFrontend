export function createResponseHandler(key, mapper) {
  const handleResponse = (response) => {
    const dataList = response.data[key];
    const objectList = dataList.map(mapper);

    return new Promise((resolve) => resolve(objectList));
  }

  return handleResponse;
}