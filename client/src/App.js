import './App.css';
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import NonTeaching from './components/NonTeaching';
import CasualLeaveForm from './components/CasualLeaveForm';
import ODLeaveForm from './components/ODLeaveForm';
import HPCLLeaveForm from './components/HPCLLeaveForm';

import EmployeeDetails from './components/EmployeeDetails';
import HodDashboard from './components/HodDashboard';
import PrincipalDashboard from './components/PrincipalDashboard';
import DirectorDashboard from './components/DirectorDashboard';


function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/director" element={<DirectorDashboard/>} />
      
        
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/non-teaching" element={<NonTeaching />} />
        <Route path="/casual-leave" element={<CasualLeaveForm />} />
        <Route path="/od-leave" element={<ODLeaveForm />} />
        <Route path="/hpcl-leave" element={<HPCLLeaveForm />} />
        <Route path="/emp" element={<EmployeeDetails />} />
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
