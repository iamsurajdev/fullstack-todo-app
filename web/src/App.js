import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" exact element={<TaskList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
