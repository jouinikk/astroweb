import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { AccountCircle, Explore, Home, VerifiedUser } from '@mui/icons-material';
const TopBar = () => {

  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link class="navbar-brand mx-5" to="/">astro web</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link" to="/"><Home/> </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/profile"><AccountCircle/></Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/explore"><Explore/></Link>
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