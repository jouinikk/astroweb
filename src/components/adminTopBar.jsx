import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
const TopBar = ()=>{

  const authCtx = useContext(AuthContext);

  const logoutHandler = ()=>{
    authCtx.logout();
  }
        return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link class="navbar-brand mx-5" to="/">astro web</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="/">Home </Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" to="/users">All users </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/profile">profile</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/flags">flags</Link>
              </li>
            </ul>
          </div>
          <ul className='navbar-nav ml-auto'>
                <li class="nav-item">
                  <p class="nav-link" onClick={logoutHandler}>logout</p>
                </li>
              </ul>
      </nav>    
    );    
}

export default TopBar;