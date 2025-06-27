import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNotFound from "./pages/NotFoundPage/Pagenotfound";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
