import React, { createContext, useMemo, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import "./App.css";
import { AddAlarmPage, AddChannelPage, EditAlarmPage } from 'pages';

import { getChat } from 'objects';

export const chatContext = createContext();
export const chatIdContext = createContext();

function App() {
  const [chat, setChat] = useState(null);

  // 현재 페이지의 URL 파라미터 정보 가져오기
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const loadChat = () => {
    const chatId = queryParams.get('chat');

    getChat(chatId).then(setChat);
  };

  // 페이지가 로드될 때 chat 상태 설정
  useEffect(loadChat, []);

  const chatMemo = useMemo(() => chat, [chat]);

  const render = () => {
    if (!chatMemo) {
      return (<div />);
    }

    return (
      <chatContext.Provider value={chatMemo}>
        <div>
          <Routes>
            <Route path="/add-alarm" element={<AddAlarmPage />} />
            <Route path="/add-channel" element={<AddChannelPage />} />
            <Route path="/edit-alarm" element={<EditAlarmPage />} />
            {/* <Route path="/test" element={<TestComponent />} /> */}
          </Routes>
        </div>
      </chatContext.Provider>
    );
  }

  return render();
}

function TestComponent(props) {
  const [chat, setChat] = useState(null);

  useEffect(() => {
    getChat(6069272927).then(setChat);
  }, []);

  useEffect(() => {
    if (chat === null) return;

    console.log(chat);
  }, [chat]);

  return (
    <div>
    </div>
  );
}

export default App;
