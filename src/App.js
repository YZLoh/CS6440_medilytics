import SignIn from './SignIn';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">

    //     <p>
    //       Hello, World!
    //     </p>

    //   </header>
    // </div>
    <>
      
      <Router>
      <Routes>
      <Route exact path="/login" element={<SignIn />} />

      </Routes>
      </Router>
    </>
    
  );
}

export default App;
