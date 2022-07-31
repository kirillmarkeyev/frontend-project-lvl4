import axios from 'axios';
import React, { useEffect } from 'react';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const MainPage = () => {

  const { getAuthHeader } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      console.log(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
        Under construction
    </div>
  );
};

export default MainPage;
