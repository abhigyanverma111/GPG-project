import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./components/Authentication/login";
import Register from "./components/Authentication/register";
import Header from "./components/header";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

function AppRoutes() {
  // Define routes inside the component that is rendered inside BrowserRouter
  const routesArray = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <Login />, // Fallback route (e.g., 404 handling)
    },
  ];

  // Generate the routes elements using useRoutes
  return useRoutes(routesArray);
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <AppRoutes /> {/* Place useRoutes inside BrowserRouter */}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
