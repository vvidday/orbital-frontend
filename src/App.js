import {Nav} from "./components/nav";
import {Game} from "./components/game";
import {ApiTest} from "./components/apitesting";

function App() {

  const accounts = [
    {id:"27260086",name:"Justin Bieber",username:"justinbieber"},
    {id:"813286",name:"Barack Obama",username:"BarackObama"},
    {id:"21447363",name:"KATY PERRY",username:"katyperry"},
    {id:"155659213",name:"Cristiano Ronaldo",username:"Cristiano"},
    {id:"18839785",name:"Narendra Modi",username:"narendramodi"},
    {id:"25365536",name:"Kim Kardashian",username:"KimKardashian"},
    {id:"50393960",name:"Bill Gates",username:"BillGates"},
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
