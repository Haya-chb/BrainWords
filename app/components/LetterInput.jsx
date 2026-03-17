import { useState } from "react";

export const LetterInput = ({ onLetterSubmit }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
  e.preventDefault();
  onLetterSubmit(text);
  setText("");
}

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>Entrer une lettre</label>
      <input value={text} 
      onChange={handleChange}
      maxLength={1} />

      <input type="submit" value="Valider" />
      </form>
    </>
  );
};