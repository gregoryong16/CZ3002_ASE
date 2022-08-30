import "./App.css";
import Login from "./routes/login-page";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Link to="/login">Login</Link>
    </Container>
  );
}

export default App;
