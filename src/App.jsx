import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SignIn from "./components/auth/sigin";
import Game from "./components/game/game";
import Home from "./components/home";
import { useAuthContext } from "./context/authContext";

function App() {
  const { token } = useAuthContext();

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/signin"
            element={token ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <SignIn />}
            // element={<SignIn />}
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
