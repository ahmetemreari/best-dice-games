import React, { useState } from 'react';
import './DiceGame.css';

const DiceGame = ({ playerName = "Player 1", language = "tr" }) => {
  const [playerDice, setPlayerDice] = useState(null);
  const [computerDice, setComputerDice] = useState(null);
  const [result, setResult] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(playerName);
  const [displayName, setDisplayName] = useState(playerName);
  
  // Çoklu dil için metinler
  const translations = {
    tr: {
      title: "Amaç Basit, Kazanmak!",
      rollDice: "Zar At!",
      rollingDice: "Zarlar Atılıyor...",
      rollAgain: "Tekrar At!",
      edit: "Düzenle",
      save: "Kaydet",
      wins: "Kazanılan",
      losses: "Kaybedilen",
      draws: "Berabere",
      youWin: "Kazandınız!",
      youLose: "Kaybettiniz!",
      draw: "Berabere!"
    },
    en: {
      title: "Simple Goal, Win!",
      rollDice: "Roll Dice!",
      rollingDice: "Rolling Dice...",
      rollAgain: "Roll Again!",
      edit: "Edit",
      save: "Save",
      wins: "Wins",
      losses: "Losses",
      draws: "Draws",
      youWin: "You Win!",
      youLose: "You Lose!",
      draw: "Draw!"
    },
    de: {
      title: "Einfaches Ziel, Gewinnen!",
      rollDice: "Würfeln!",
      rollingDice: "Würfeln...",
      rollAgain: "Erneut Würfeln!",
      edit: "Bearbeiten",
      save: "Speichern",
      wins: "Gewonnen",
      losses: "Verloren",
      draws: "Unentschieden",
      youWin: "Sie Gewinnen!",
      youLose: "Sie Verlieren!",
      draw: "Unentschieden!"
    }
  };
  
  const text = translations[language];

  // Function to roll dice
  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setResult("");
    
    // Animation for rolling dice
    const diceAnimation = setInterval(() => {
      setPlayerDice(Math.floor(Math.random() * 6) + 1);
      setComputerDice(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    // Stop animation after 3 seconds and determine the winner
    setTimeout(() => {
      clearInterval(diceAnimation);
      
      const playerRoll = Math.floor(Math.random() * 6) + 1;
      const computerRoll = Math.floor(Math.random() * 6) + 1;
      
      setPlayerDice(playerRoll);
      setComputerDice(computerRoll);
      
      let gameResult = "";
      if (playerRoll > computerRoll) {
        gameResult = text.youWin;
        setStats(prev => ({ ...prev, wins: prev.wins + 1 }));
      } else if (playerRoll < computerRoll) {
        gameResult = text.youLose;
        setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
      } else {
        gameResult = text.draw;
        setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
      
      setResult(gameResult);
      setIsRolling(false);
    }, 3000);
  };

  // Handle player name edit
  const handleNameEdit = () => {
    setEditingName(true);
    setTempName(displayName);
  };

  const handleNameSave = () => {
    setDisplayName(tempName || "Player 1");
    setEditingName(false);
  };

  // UI for changing button text based on game state
  const getButtonText = () => {
    if (isRolling) return text.rollingDice;
    if (!playerDice && !computerDice) return text.rollDice;
    return text.rollAgain;
  };

  return (
    <div className="game-container">
      <h1>{text.title}</h1>
      
      {/* Player Name Section */}
      <div className="player-name">
        {editingName ? (
          <div className="name-edit">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Kullanıcı Adı"
            />
            <button onClick={handleNameSave} className="save-btn">
              {text.save}
            </button>
          </div>
        ) : (
          <div className="name-display">
            <h2>{displayName}</h2>
            <button onClick={handleNameEdit} className="edit-btn">
              {text.edit}
            </button>
          </div>
        )}
      </div>
      
      {/* Dice Section */}
      <div className="dice-section">
        <div className="dice-container">
          <h3>{displayName}</h3>
          <div className="dice">
            {playerDice ? (
              <img 
                src={`/images/dice${playerDice}.png`} 
                alt={`Dice showing ${playerDice}`} 
              />
            ) : (
              <img 
                src="/images/Dice.png" 
                alt="Dice" 
              />
            )}
          </div>
        </div>
        
        <div className="dice-container">
          <h3>PC</h3>
          <div className="dice">
            {computerDice ? (
              <img 
                src={`/images/dice${computerDice}.png`} 
                alt={`Dice showing ${computerDice}`} 
              />
            ) : (
              <img 
                src="/images/Dice.png" 
                alt="Dice" 
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Result Section */}
      {result && (
        <div className={`result ${
          result === text.youWin ? "win" : 
          result === text.youLose ? "lose" : "draw"
        }`}>
          {result}
        </div>
      )}
      
      {/* Roll Button */}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`roll-btn ${isRolling ? "disabled" : ""}`}
      >
        {getButtonText()}
      </button>
      
      {/* Stats Section */}
      <div className="stats">
        <div className="stat win">
          <p className="stat-value">{stats.wins}</p>
          <p className="stat-label">{text.wins}</p>
        </div>
        <div className="stat lose">
          <p className="stat-value">{stats.losses}</p>
          <p className="stat-label">{text.losses}</p>
        </div>
        <div className="stat draw">
          <p className="stat-value">{stats.draws}</p>
          <p className="stat-label">{text.draws}</p>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;