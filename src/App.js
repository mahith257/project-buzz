import './App.css'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {useAuthContext} from './hooks/useAuthContext'
import AllUsers from './components/AllUsers';

function App() {

  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to='/login'/>}
                {user && <Dashboard />}
              </Route>
              <Route path="/create">
                {!user && <Redirect to='/login'/>}
                {user && <Create />}
              </Route>
              <Route path="/project/:id">
                {!user && <Redirect to='/login'/>}
                {user && <Project />}
              </Route>
              <Route path="/login">
                {!user && <Login />}
                {user && <Redirect to='/' />}
              </Route>
              <Route path="/signup">
                {!user && <Signup />}
                {user && <Redirect to='/' />}
              </Route>
            </Switch>
          </div>
          {user && <AllUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
