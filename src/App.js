import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import "./App.css";
import AddAlarmPage from './add-alarm-page/AddAlarmPage';
import AddChannelPage from './add-channel-page/AddChannelPage';
import EditAlarmPage from './edit-alarm-page/EditAlarmPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/add-alarm" element={<AddAlarmPage />} />
        <Route path="/add-channel" element={<AddChannelPage />} />
        <Route path="/edit-alarm" element={<EditAlarmPage />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </div>
  );
}

function TestComponent(props) {
  return (
    <div>
    </div>
  );
}

export default App;
