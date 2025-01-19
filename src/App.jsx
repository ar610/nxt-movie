import { useState } from 'react'
import Homepage from './Homepage'
import './App.css'

import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/SignUp";
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
                    <Homepage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
    </>
  )
}

export default App
