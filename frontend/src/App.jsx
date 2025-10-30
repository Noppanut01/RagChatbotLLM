import HomePage from './pages/user/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Dashboard from './pages/admin/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;