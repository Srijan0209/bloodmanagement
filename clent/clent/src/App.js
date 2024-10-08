
import {Routes,Route} from 'react-router-dom';
import login from "./pages/auth/login"


function App() {
  return (
    <>
    <div>
      <Routes>
        < Route path="/" element={<login />}/>
      </Routes>
    </div>
    </>
    
  );
}

export default App;
