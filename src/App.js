import SignIn from './SignIn';
import PatientProfile from './patient/PatientProfile';
import PatientUpdates from './patient/PatientUpdates';
import Test from './patient/Test';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <>  
      <Router>
      <Routes>
      <Route exact path="/login" element={<SignIn />} />
      <Route exact path="/patient-profile" element={<PatientProfile />} />
      <Route exact path="/patient-updates" element={<PatientUpdates />} />
      <Route  path="/test" element={<Test />} />
      </Routes>
      </Router>
    </>
    
  );
}

export default App;
