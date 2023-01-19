import React from 'react';
import LoginForm from './pages/LoginForm';
import HomePage from './pages/HomePage';
import SignupPage from './pages/Register';
import './App.css';
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";


function App() {
  localStorage.getItem("token")

  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginForm /> },
    { path: '/register', element: <SignupPage /> }
  ]);
  return routes

}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

