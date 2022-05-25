import {Nav} from "./components/nav";
import {Game} from "./components/game";
import {ApiTest} from "./components/apitesting";

function App() {

  const accounts = [
    {username: "justinbieber"},
    {username: "BarackObama"},
    {username: "katyperry"},
    {username: "Cristiano"},
    {username: "narendramodi"},
    {username: "KimKardashian"},
    {username: "BillGates"},
  ];


  return (
    <div className="App">
      <Nav />
      <Game accounts={accounts} />
      <ApiTest />
    </div>
  );
}

export default App;
