// context/MatchContext.js
import React, { createContext, useState } from 'react';

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [matchType, setMatchType] = useState('Limited Overs');
  const [overs, setOvers] = useState('');
  const [savedOvers, setSavedOvers] = useState('');
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [tossWinner, setTossWinner] = useState(null);
  const [tossDecision, setTossDecision] = useState(null);
  
  return (
    <MatchContext.Provider
      value={{
        matchType,
        setMatchType,
        overs,
        setOvers,
        savedOvers,
        setSavedOvers,
        teamA,
        setTeamA,
        teamB,
        setTeamB,
        tossWinner, setTossWinner,
        tossDecision, setTossDecision
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};
