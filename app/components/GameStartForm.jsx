import { useState } from "react";

export function GameStartForm() {

  const [locale, setLocale] = useState("fr-FR");

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("userData", JSON.stringify({ locale }));

    window.location.href = "/game";
  }

  return (
    <form onSubmit={handleSubmit}>

      <label>Language</label>

      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      >
        <option value="fr-FR">Français</option>
        <option value="en-US">English</option>
      </select>

      <button type="submit">
        Start Game
      </button>

    </form>
  );
}