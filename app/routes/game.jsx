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

  // get language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData?.locale) {
        setLocale(userData.locale);
      }
    }
  }, []);

  // choose alphabet depending on language
  const alphabetLetters =
    locale === "fr-FR"
      ? alphabet["français"]
      : alphabet["english"];



  // fetch a word from API
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

        // show "_" but keep "-" visible
        const initialDisplay = cleanWord
          .split("")
          .map((char) => (char === "-" ? "-" : "_"))
          .join("");

        setWord(cleanWord);
        setDisplayedWord(initialDisplay);
        setUsedLetters([]);

      });
  }

  // load first word
  useEffect(() => {
    fetchWord();
  }, [locale]);

  // reveal letter logic
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

      // good letter 
      setScore((prev) => prev + 2);
      setDistance((prev) => Math.min(prev + 1, 10));

      // word completed
      if (!newWord.includes("_")) {
        setScore((prev) => prev + 10);
        fetchWord(); // new word
      }

    } else {

      // wrong letter 
      setScore((prev) => prev - 2);

      setDistance((prev) => {
        const newDistance = prev - 3;

        // if zombie reaches player → game over
        if (newDistance <= 0) {
          window.location.href = "/end";
        }

        return newDistance;
      });

    }
  }

  // the page 
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
      // correct word
      setScore((prev) => prev + 10);
      setDistance((prev) => Math.min(prev + 2, 10));
      fetchWord();
      setError("");

    } else {
      // wrong word
      setScore((prev) => prev - 5);
      setDistance((prev) => {
        const newDistance = prev - 2;

        if (newDistance <= 0) {
          localStorage.setItem("currentScore", score);
          window.location.href = "/end";
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