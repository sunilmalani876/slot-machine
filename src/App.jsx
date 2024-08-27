import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SignIn from "./components/auth/sigin";
import { useAuthContext } from "./context/authContext";
import Game from "./components/game/game";

function App() {
  const { token } = useAuthContext();

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<p>Home page</p>} />

          <Route
            path="/signin"
            element={token ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <SignIn />}
          />

          <Route
            path="/game/:id"
            element={token ? <Game /> : <Navigate to="/signin" />}
          />
          <Route path="/dashboard" element={<p>dashboard page</p>} />
          <Route path="*" element={<p>No Page Found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
