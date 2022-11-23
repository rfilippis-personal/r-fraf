import "rsuite/styles/index.less";
import { Button } from "rsuite";
import GlobalStyle from "./globalStyles";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <main>
        Here comes do code
        <Button>Teste button</Button>
      </main>
      <footer>Powered by rfilippis</footer>
    </>
  );
}

export default App;
