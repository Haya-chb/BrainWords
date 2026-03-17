import { Human } from "./Human";
import { Zombie } from "./Zombie";
import "../styles/characterLayer.css"; 

export const CharacterLayer = ({ distance }) => {
  return (
    <div className="characterLayer">

    
      <div className="humanPosition">
        <Human />
      </div>

     
<div
  className="zombiePosition"
style={{ left: `${300 + distance * 25}px` }}
>
  <Zombie frame={0} />
</div>
        

    </div>
  );
};