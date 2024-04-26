import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";
import { variables } from "@parklego/themes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* here design token!! */}
        <p className="heading4xl">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Text>
          orange variables token color :{" "}
          {variables.colors.$static.light.orange[400]}
        </Text>
        <a
          className="text4xl"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          welecome design token
        </a>
      </header>
    </div>
  );
}

export default App;

const Text = styled.p`
  color: var(--orange-400);
  font-size: var(--font-size-30);
`;
