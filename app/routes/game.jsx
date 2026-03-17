import { useState, useEffect } from "react";

import { NavLink } from "react-router";
import { GuessWord } from "../components/GuessWord";
import { UsedLetters } from "../components/UsedLetters";
import { LetterInput } from "../components/LetterInput";
import { Word } from "../components/Word";
import { Score } from "../components/CurrentScore";
import { CharacterLayer } from "../components/CharacterLayer";

import "../styles/game.css";

import alphabet from "../data/alphabet.json";


export default function Game() {

  const [locale, setLocale] = useState("fr-FR");
  const [word, setWord] = useState("");
  const [displayedWord, setDisplayedWord] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(10);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData?.locale) {
        setLocale(userData.locale);
      }
    }
  }, []);

  const alphabetLetters =
    locale === "fr-FR"
      ? alphabet["français"]
      : alphabet["english"];

  function endGame() {
    localStorage.setItem("currentScore", score);
    window.location.href = "/end";
  }

  function fetchWord() {
    fetch("http://localhost:3333", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `locale=${locale}`,
    })
      .then((res) => res.json())
      .then((data) => {
        const cleanWord = data.word.trim().toLowerCase();

        const initialDisplay = cleanWord
          .split("")
          .map((char) => (char === "-" ? "-" : "_"))
          .join("");

        setWord(cleanWord);
        setDisplayedWord(initialDisplay);
        setUsedLetters([]);
      });
  }

  useEffect(() => {
    fetchWord();
  }, [locale]);

  function revealLetter(letter) {
    let newWord = "";
    let found = false;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        newWord += letter;
        found = true;
      } else {
        newWord += displayedWord[i];
      }
    }

    setDisplayedWord(newWord);

    if (found) {
      setScore((prev) => prev + 2);
      setDistance((prev) => Math.min(prev + 1, 10));

      if (!newWord.includes("_")) {
        setScore((prev) => prev + 10);
        fetchWord();
      }

    } else {
      setScore((prev) => prev - 2);

      setDistance((prevDistance) => {
        const newDistance = prevDistance - 3;

        if (newDistance <= 0) {
          endGame();
        }

        return newDistance;
      });
    }
  }

  return (
    <>
      <div className="game">
        
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
        </nav>

        <main>

          <CharacterLayer distance={distance} />

          <div className="gameUI">

            <Score score={score} />

            {error && <p className="error">{error}</p>}

            <Word displayedWord={displayedWord} />

            <GuessWord
              onGuess={(guess) => {

                if (guess === word) {
                  setScore((prev) => prev + 10);
                  setDistance((prev) => Math.min(prev + 2, 10));
                  fetchWord();
                  setError("");

                } else {
                  setScore((prev) => prev - 5);

                  setDistance((prevDistance) => {
                    const newDistance = prevDistance - 2;

                    if (newDistance <= 0) {
                      endGame();
                    }

                    return newDistance;
                  });

                  setError("Wrong word");
                }

              }}
            />

            <UsedLetters usedLetters={usedLetters} />

            <LetterInput
              onLetterSubmit={(letter) => {
                const lower = letter.toLowerCase();

                setError("");

                if (!alphabetLetters.includes(lower)) {
                  setError("Invalid letter for this language");
                  return;
                }

                if (usedLetters.includes(lower)) {
                  setError("Letter already used");
                  return;
                }

                setUsedLetters([...usedLetters, lower]);
                revealLetter(lower);
              }}
            />

          </div>

        </main>

      </div>
    </>
  );
}