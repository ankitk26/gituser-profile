import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import Header from "./layouts/header";
import Home from "./pages/home";
import UserRepos from "./pages/user-repos";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:username/repos/:pageNumber" element={<UserRepos />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
