import { useState } from "react";
import { Letter } from "./Letter";


export const UsedLetters = ({ usedLetters }) => {
  return (
    <div className="usedLetters">
      {usedLetters.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </div>
  );
};

