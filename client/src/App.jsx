import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Ping />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
