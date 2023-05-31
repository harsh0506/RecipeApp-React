import React  , { useState } from 'react'
import './App.css'
import Login from '../src/Auth/Login'
import Signup from "../src/Auth/SignUp"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './Auth/FirebaseConfig'
import Recipe from "./Recipe"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import USerRecipies from "./USerRecipes"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/USerRecipies" element={<USerRecipies />} />
        </Routes>
      </BrowserRouter>
    </>


  )
}

export default App
