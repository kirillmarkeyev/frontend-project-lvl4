import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.jsx';

const app = () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = init(socket);
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
