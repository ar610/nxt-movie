import './App.css'
import { Routes, Route } from "react-router-dom";

import Homepage from './Homepage'
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <>
      <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Homepage />
                  </ProtectedRoute>
                }
              />
              <Route 
              path="/movies" 
              element={
                <ProtectedRoute>
                  <Navbar />
                  <MovieList />
                </ProtectedRoute>
              } 
              />
              <Route path="/" element={<Login />} />
            </Routes>
      </UserAuthContextProvider>
    </>
  )
}

export default App;