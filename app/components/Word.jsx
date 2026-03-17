export const Word = ({ displayedWord }) => {
  return (
    <div>
      {displayedWord.split("").map((letter, index) => (
        <span key={index}>{letter} </span>
      ))}
    </div>
  );
};