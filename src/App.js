import SignIn from "./SignIn";
import Landing from "./components/Landing";
import AllocatedDonors from "./opo/AllocatedDonors";
import DonationRecords from "./opo/DonationRecords";
import PendingDonors from "./opo/PendingDonors";
import PatientProfile from "./patient/PatientProfile";
import PatientUpdates from "./patient/PatientUpdates";
import Donors from "./provider/Donors";
import Recipients from "./provider/Recipients";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NewPatient from "./provider/NewPatient";
import { useState } from "react";
function App() {
  const getRoleVal = () => {
    const storedRole = localStorage.getItem("savedRole");
    return storedRole;
  };

  const roleData = getRoleVal();
  const [role, setRole] = useState(roleData);

  const RouteAuthentication = ({ element, neededRole }) => {
    if (role === neededRole) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <>
      <Router>
        <Routes>
          {/* Patient Routes */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<SignIn />} />
          <Route
            exact
            path="/patient-profile"
            element={
              <RouteAuthentication
                element={<PatientProfile />}
                neededRole="patient"
              />
            }
          />
          <Route
            exact
            path="/patient-updates"
            element={
              <RouteAuthentication
                element={<PatientUpdates />}
                neededRole="patient"
              />
            }
          />

          {/* OPO routes */}
          <Route
            exact
            path="/pending-donations"
            element={
              <RouteAuthentication
                element={<PendingDonors />}
                neededRole="opo"
              />
            }
          />
          <Route
            exact
            path="/allocated-donations"
            element={
              <RouteAuthentication
                element={<AllocatedDonors />}
                neededRole="opo"
              />
            }
          />
          <Route
            exact
            path="/donation-records"
            element={
              <RouteAuthentication
                element={<DonationRecords />}
                neededRole="opo"
              />
            }
          />

          {/*  Provider routes*/}
          <Route
            exact
            path="/donors"
            element={
              <RouteAuthentication element={<Donors />} neededRole="provider" />
            }
          />
          <Route
            exact
            path="/recipients"
            element={
              <RouteAuthentication
                element={<Recipients />}
                neededRole="provider"
              />
            }
          />
          <Route
            exact
            path="/new-patient"
            element={
              <RouteAuthentication
                element={<NewPatient />}
                neededRole="provider"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
