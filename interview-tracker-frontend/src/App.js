import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Topics from "./pages/Topics";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import MockInterview from "./pages/MockInterview";
import Suggestions from "./pages/Suggestions";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/tasks/:topicId" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:topicId" element={<Quiz />} />
        <Route path="/mock-interview/:topicId" element={<MockInterview />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;