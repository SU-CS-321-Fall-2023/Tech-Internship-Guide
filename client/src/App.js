import { Register } from './pages/Register';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { Resources } from './pages/Resources';
import {Route, Routes} from 'react-router-dom';
import { SignOut } from './pages/SignOut';
import { useSignIn } from './hooks/useSignIn';
import { NotFound } from './components/Notfound';

function App() {
  const loggedIn = useSignIn()

  return (
    <div className="container-fluid min-vh-100 bg-secondary">
      <Routes>
        <Route exact path='/' element={<Home />}/>
        {loggedIn && <Route exact path='/resources' element={<Resources/>}/>}
        <Route exact path='/signup' element={<Register/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
        <Route exact path='/m/signout' element={<SignOut/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
