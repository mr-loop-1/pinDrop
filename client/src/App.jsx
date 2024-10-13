import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthGuard from "./guard/AuthGuard";
import Ping from "./guard/Ping";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Loading from "./pages/Loading";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Ping />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loading" element={<Loading />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Home />} />
          <Route path="/:folderId" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
