import "./App.css";
import Container from "react-bootstrap/Container";
import CardList from "./Components/CardList/CardList";
import SearchBar from "./Components/SearchBar";

function App() {


  return (
    <Container>
      <SearchBar />
      <CardList />
    </Container>
  );
}

export default App;
