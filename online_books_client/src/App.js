import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import DashBoard from "./Pages/Dashboard/DashBoard";
import BookInfo from "./Components/Books/BookInfo";

function App() {
  return (
    <Router className="App h-full">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/book" element={<BookInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
