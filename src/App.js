import {Nav} from "./components/nav";
import {Game} from "./components/game";

function App() {

  const accounts = [
    {name: "Celeb 1"},
    {name: "Celeb 2"},
    {name: "Celeb 3"}
  ];


  return (
    <div className="App">
      <Nav />
      <Game accounts={accounts} />
    </div>
  );
}

export default App;
