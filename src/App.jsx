import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {UserContextWrapper} from "./contexts/UserContext";
import {Routes, Route} from "react-router-dom";
import Editor from "./components/Editor/Editor";

function App() {
  return <UserContextWrapper>
      <Routes>
          <Route path="/create" element={
              <Editor></Editor>
          }></Route>
          <Route path="/edit/:snippetID" element={
              <Editor></Editor>
          }></Route>
      </Routes>
  </UserContextWrapper>
}

export default App;