function App() {
  return (
    <div className="App">
      Hello World
      {process.env.REACT_APP_SECRET}
    </div>
  );
}

export default App;
