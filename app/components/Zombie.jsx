import "../styles/zombie.css";

export const Zombie = ({ frame = 0 }) => {

  const frameWidth = 128;
  const scale = 3;

  return (
    <div
      className="zombie"
      style={{
        backgroundPosition: `-${frame * frameWidth * scale}px 0px`
      }}
    />
  );
};