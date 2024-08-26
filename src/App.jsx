import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SignIn from "./components/auth/sigin";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<p>Home page</p>} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignIn />} />

          <Route path="/game" element={<p>game page</p>} />
          <Route path="/dashboard" element={<p>dashboard page</p>} />
          <Route path="*" element={<p>No Page Found</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
