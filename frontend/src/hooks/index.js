import { useContext } from 'react';

import { AuthContext, SocketContext } from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);

export const useSocket = () => useContext(SocketContext);
