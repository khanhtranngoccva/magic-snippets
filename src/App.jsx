import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {UserContextWrapper} from "./contexts/UserContext";
import {Routes, Route} from "react-router-dom";
import EditorView from "./views/EditorView";

function App() {
  return <UserContextWrapper>
      <Routes>
          <Route path="/create" element={
              <EditorView></EditorView>
          }></Route>
          <Route path="/edit/:snippetID" element={
              <EditorView></EditorView>
          }></Route>
      </Routes>
  </UserContextWrapper>
}

export default App;