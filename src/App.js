import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Outlet, Routes, Route } from 'react-router-dom';
import Patients from './Components/Patient/Patients';
import PatientDetail from './Components/Patient/PatientDetail';
import Logout from './Components/Login/Logout';

function App() {
  return (
    <div className="App">

      <Router>
        {/* <Login /> */}
        <Routes>
          <Route path="/" element={<Login />} exact></Route>
          <Route path="/Patients" element={<Patients />} exact />
          <Route path="/PatientDetail" element={<PatientDetail />} exact />
          <Route path="/Logout" element={<Logout />} exact />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
