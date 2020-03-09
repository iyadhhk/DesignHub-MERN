import React, { Fragment } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import FreeProfile from '../Profiles/FreeProfile';
import logohorizantal from './svg/logohorizontal.svg';
import Footer from './footer';

const GuestPage = () => {
  return (
    <Fragment>
      <header className='navbar'>
        <Link to='/Welcome'>
          <img src={logohorizantal} className='navlogo' alt='designhub-logo'></img>
        </Link>
        <ul className='navlist'>
          <Link to='/Guest/search'>
            <li>
              <a href='#'>freelancers</a>
            </li>
          </Link>
          <Link to='/Welcome/login'>
            <li>
              <a href='#' className='signin'>
                sign in
              </a>
            </li>
          </Link>
          <li>
            <a href='#'>contact us</a>
          </li>
        </ul>
      </header>
      <Switch>
        <Route path='/Guest/search' component={SearchPage} />
        <Route path='/Guest/profile' component={FreeProfile} />
      </Switch>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default GuestPage;
