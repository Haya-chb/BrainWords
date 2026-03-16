import { NavLink } from "react-router";
import { GameStartForm } from "../components/GameStartForm";

// export function meta() {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }



export function Nav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/score" end>
        Scores
      </NavLink>
    </nav>
  );
}



export default function Home() {
  return (

    <main>
      <h1>BrainWords</h1>

      < GameStartForm />

    </main>
  );
}
