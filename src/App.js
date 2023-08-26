import React from 'react';
import { Route, Routes } from 'react-router-dom';

import "./App.css";
import AddAlarmPage from './add-alarm-page/AddAlarmPage';
import AddChannelPage from './add-channel-page/AddChannelPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/add-alarm" element={<AddAlarmPage />} />
        <Route path="/add-channel" element={<AddChannelPage />} />
      </Routes>
    </div>
  );
}

export default App;
