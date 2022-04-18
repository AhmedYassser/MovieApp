import jwtDecode from 'jwt-decode';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Gallary from './Gallary/Gallary';
import Home from './Home/Home';
import Login from './Login/Login';
import Movies from './Movies/Movies';
import Navbar from './Navbar/Navbar';
import Regester from './Regester/Regester';
import Tv from './Tv/Tv';
import { useState, useEffect } from 'react'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


function App() {


  const history = useHistory();
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserInfo();
    }

  }, [])

  function getUserInfo() {
    let encodedToken = localStorage.getItem('token');
    let userData = jwtDecode(encodedToken);
    console.log(userData);
    setLoginUser(userData);
  }

  function logOut() {
    localStorage.removeItem('token');
    setLoginUser(null);
    history.push('/login')
  }


  return (
    <>
      <Navbar loginUser={loginUser} logOut={logOut}/>
      <div className="container">
        <Switch>
          <ProtectedRoute path='/home' componant={Home} loginUser={loginUser}/>
          <ProtectedRoute path='/movies' componant={Movies}/>
          <ProtectedRoute path='/gallary' componant={Gallary}/>
          <ProtectedRoute path='/tv' componant={Tv}/>
          <Route path="/login" render={(props) => <Login {...props} getUserInfo={getUserInfo} />} />
          <Route path="/regester" render={(props) => <Regester {...props} />} />
          <Redirect from='/' exact to='/home' />
        </Switch>
      </div>
    </>
  );
}

export default App;
