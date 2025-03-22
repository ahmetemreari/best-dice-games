import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">© 2025 AHMET EMRE ARI</p>
        <div className="social-links">
          <a href="https://github.com/ahmetemreari" target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/aemreari/" target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;