import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "../styles/end.css";

export default function End() {

  const [score, setScore] = useState(0);

  useEffect(() => {

    // get score from localStorage
    const savedScore = Number(localStorage.getItem("currentScore")) || 0;
    setScore(savedScore);

  }, []);

  return (
    <main>

      <h1>Game Over</h1>

      <p>Your score: {score}</p>

      <NavLink to="/">
        Play again
      </NavLink>

    </main>
  );
}