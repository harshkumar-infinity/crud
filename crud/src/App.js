import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardData from './Dashboard/Dashboard';
import CreateNots from './Dashboard/CreateNots';
import NoPage from './componets/404/index';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardData />} />
          <Route path="/notes" element={<CreateNots />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
