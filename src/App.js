import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Header from "./components/Header/Header";
import PrivateRoute from "./Auth/PrivateRoute";
import AuthProvider from "./Auth/AuthContext";
import Dashboard from "./pages/UsersList/Dashboard";

function App() {
  const HeaderWrapper = () => {
    const location = useLocation();
    if (location.pathname === "/") {
      return null;
    }
    return <Header />;
  };

  return (
    <AuthProvider>
      <Router>
        <HeaderWrapper />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
