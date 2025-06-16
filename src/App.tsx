import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <div className="app-wraper">
      <h1>Welcome to Gemini</h1>
      <Link to="/login">go to Login</Link>
    </div>
  )
}

export default App;