import './App.css'
import {UserContextWrapper} from "./contexts/UserContext";
import {Routes, Route} from "react-router-dom";
import EditorView from "./views/EditorView";
import ViewerView from "./views/ViewerView";

function App() {
  return <UserContextWrapper>
      <Routes>
          <Route path="/create" element={
              <EditorView></EditorView>
          }></Route>
          <Route path="/edit/:snippetID" element={
              <EditorView></EditorView>
          }></Route>
          <Route path="/view/:snippetID" element={
              <ViewerView></ViewerView>
          }></Route>
      </Routes>
  </UserContextWrapper>
}

export default App;