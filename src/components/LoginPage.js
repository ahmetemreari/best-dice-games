import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('tr');
  
  // Çoklu dil için metinler
  const translations = {
    tr: {
      title: 'Zar Oyunu - Giriş',
      username: 'Kullanıcı Adı',
      password: 'Şifre',
      login: 'Giriş Yap',
      guest: 'Misafir Olarak Devam Et',
      loginWith: 'Şununla giriş yap:',
      register: 'Hesap Oluştur',
      forgotPassword: 'Şifremi Unuttum',
      languageSelect: 'Dil Seçimi',
      welcome: 'Hoş Geldiniz',
    },
    en: {
      title: 'Dice Game - Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      guest: 'Continue as Guest',
      loginWith: 'Login with:',
      register: 'Create Account',
      forgotPassword: 'Forgot Password',
      languageSelect: 'Language Selection',
      welcome: 'Welcome',
    },
    de: {
      title: 'Würfelspiel - Anmeldung',
      username: 'Benutzername',
      password: 'Passwort',
      login: 'Anmelden',
      guest: 'Als Gast fortfahren',
      loginWith: 'Anmelden mit:',
      register: 'Konto erstellen',
      forgotPassword: 'Passwort vergessen',
      languageSelect: 'Sprachauswahl',
      welcome: 'Willkommen',
    }
  };
  
  const text = translations[language];
  
  // Giriş işlemi
  const handleLogin = (e) => {
    e.preventDefault();
    // Gerçek uygulamada burada API çağrısı yapılır
    if (username && password) {
      onLogin({ username, language });
    }
  };
  
  // Misafir girişi
  const handleGuestLogin = () => {
    onLogin({ username: 'Misafir', language });
  };
  
  // Sosyal medya girişi
  const handleSocialLogin = (platform) => {
    // Gerçek uygulamada OAuth yönlendirmesi yapılır
    console.log(`${platform} ile giriş yapılıyor...`);
    onLogin({ username: `${platform} Kullanıcısı`, language });
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Dil seçimi */}
        <div className="language-selector">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        
        <div className="header">
          <h1>{text.title}</h1>
          <img src="/images/Dice.png" alt="Dice" className="logo" />
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>
              {text.username}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>
              {text.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-links">
            <a href="#">{text.forgotPassword}</a>
            <a href="#">{text.register}</a>
          </div>
          
          <button type="submit" className="btn btn-primary">
            {text.login}
          </button>
        </form>
        
        <div className="guest-login">
          <button onClick={handleGuestLogin} className="btn btn-secondary">
            {text.guest}
          </button>
        </div>
        
        <div className="social-login">
          <p>{text.loginWith}</p>
          <div className="social-buttons">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="social-btn google"
            >
              G
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="social-btn facebook"
            >
              F
            </button>
            <button
              onClick={() => handleSocialLogin('Twitter')}
              className="social-btn twitter"
            >
              T
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;