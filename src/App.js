import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import DiceGame from './components/DiceGame';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('tr');

  const handleLogin = (loginData) => {
    setUsername(loginData.username);
    setLanguage(loginData.language);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <DiceGame playerName={username} language={language} />
      )}
      <Footer />
    </div>
  );
}

export default App;