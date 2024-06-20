import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  const handleConnect = async () => {
    try {
      const response = await axios.get(`${baseUrl}/connect`);
      window.open(response.data.result, '_blank');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDisconnect = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${baseUrl}/disconnect`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) localStorage.removeItem('access_token');
      console.log(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <button style={{ backgroundColor: 'blue', color: 'white', fontSize: '24px', padding: '15px 30px' }} onClick={handleConnect}>Connect</button>
          <button style={{ backgroundColor: 'red', color: 'white', fontSize: '24px', padding: '15px 30px' }} onClick={handleDisconnect}>Disconnect</button>
        </div>
      </header>
    </div>
  );
}

export default App;
