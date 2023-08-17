import React from 'react';
import { Route, Routes } from 'react-router-dom';

import "./App.css";
import AddAlarmPage from './add-alarm-page/AddAlarmPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/add-alarm" element={<AddAlarmPage />} />
      </Routes>
    </div>
  );
}

export default App;
