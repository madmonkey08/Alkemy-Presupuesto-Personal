import './App.css';
import { Login } from './components/login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { MainView } from './components/mainView/MainView';
import { EditOperationContext } from "./context/EditOperationContext";
import { useState } from 'react';

function App() {

  const [editOp, setEditOp] = useState({});

  return (
    <Router>
      <EditOperationContext.Provider value={{ editOp, setEditOp }} >
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </EditOperationContext.Provider>
    </Router>
  );
}

export default App;
