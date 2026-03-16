import { useState } from "react";
import { Letter } from "./Letter";
import alphabet from "../data/alphabet.json";

export const UsedLetters = ({ usedLetters }) => {

  return (
    <section>
      {usedLetters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </section>
  );
};

