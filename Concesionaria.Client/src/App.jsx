import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CarList from "./Components/Car/CarList";
import CarEdit from "./Components/Car/CarEdit";
import CarForm from "./Components/Car/CarForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/form-car" element={<CarForm />} />
        <Route path="/form-car/:id" element={<CarEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
