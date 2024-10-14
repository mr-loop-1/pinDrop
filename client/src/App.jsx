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
      {/* <div className="fixed bottom-0 z-10 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black px-2">
        made by abdul samad
      </div> */}
    </Router>
  );
}

export default App;
