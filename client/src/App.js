import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { Resources } from './pages/Resources';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="container-fluid min-vh-100 bg-secondary">
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/resources' element={<Resources/>}/>
        <Route exact path='/signup' element={<Register/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
