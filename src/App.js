import SignIn from './SignIn';
import Landing from './components/Landing';
import AllocatedDonors from './opo/AllocatedDonors';
import DonationRecords from './opo/DonationRecords';
import PendingDonors from './opo/PendingDonors';
import PatientProfile from './patient/PatientProfile';
import PatientUpdates from './patient/PatientUpdates';
import Donors from './provider/Donors';
import Recipients from './provider/Recipients';
import Test from './patient/Test';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NewPatient from './provider/NewPatient';
function App() {
  return (
    <>  
      <Router>
      <Routes>
        {/* Patient Routes */}
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<SignIn />} />
      <Route exact path="/patient-profile" element={<PatientProfile />} />
      <Route exact path="/patient-updates" element={<PatientUpdates />} />
      <Route  path="/test" element={<Test />} />

{/* OPO routes */}
      <Route exact path="/pending-donations" element={<PendingDonors />} />
      <Route exact path="/allocated-donations" element={<AllocatedDonors />} />
      <Route exact path="/donation-records" element={<DonationRecords />} />
     
      {/*  Provider routes*/}
      <Route exact path="/donors" element={<Donors />} />
      <Route exact path="/recipients" element={<Recipients />} />
      <Route exact path="/new-patient" element={<NewPatient />} />
      </Routes>
      </Router>
    </>
    
  );
}

export default App;
