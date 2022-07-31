import { useContext } from 'react';

import AuthContext from '../contexts/index.js';

const useAuth = () => useContext(AuthContext);

export default useAuth;
