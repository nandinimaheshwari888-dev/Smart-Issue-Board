import CreateIssue from "./pages/CreateIssue";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IssueList from "./pages/IssueList";


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Signup</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/create-issue">Create Issue</Link> | 
          <Link to="/issues">All Issues</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-issue" element={<CreateIssue user={{email: "maheshwarinandini1112@gmail.com"}} />} />
          <Route path="/issues" element={<IssueList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
