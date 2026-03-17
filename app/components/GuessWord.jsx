import { useState } from "react";

export const GuessWord = ({ onGuess }) => {

  // input state
  const [guess, setGuess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // send guessed word to parent
    onGuess(guess.toLowerCase());

    // reset input
    setGuess("");
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="guess">
        Guess the word:
      </label>

      <input
        id="guess"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button type="submit">
        Guess
      </button>

    </form>
  );
};