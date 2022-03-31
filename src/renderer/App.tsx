import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';

interface BarState {
  currentWorkspace: string;
}

const Hello = () => {
  const [state, setState] = useState<BarState>();

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.onAny((x, y) => {
      setState({
        currentWorkspace: y.current.name,
      });
    });
  }, []);

  return (
    <div id="dock">
      <p>{state?.currentWorkspace}</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
