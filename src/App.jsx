import Home from "./components/Home";
import CharacterPage from "./components/CharacterPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<CharacterPage />} />
      </Routes>
    </>
  );
}

export default App;
