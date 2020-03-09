import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from './footer';
import './LandingPage.css';
import logohorizantal from './svg/logohorizontal.svg';
import logovertical from './svg/logovertical.svg';
import star from './svg/star.svg';
import addnewservice from './svg/addnewservice.svg';
import Slider from './slider';

const LandingPage = ({ isAuthenticated, alerts = null }) => {
  const alert = useAlert();
  useEffect(() => {
    if (alerts !== null && alerts.length > 0) {
      alerts.map(el => {
        if (el.alertType === 'error') alert.error(`${el.msg}`);
        else if (el.alertType === 'success') alert.success(`${el.msg}`);
        return null;
      });
    }
  });
  if (isAuthenticated) {
    return <Redirect to='/DesignHubHome' />;
  }

  return (
    <Fragment>
      {/* {/* NAVBAR STARTS HERE / * */}
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
      {/* {/ NAVBAR ENDS HERE */}

      {/* <div>
        <h1>this is the landing page</h1>
        <Link to='/Welcome/login'>
          <button>login </button>
        </Link>
        <Link to='/Welcome/signup'>
          <button>join us </button>
        </Link>
        <Link to='/Welcome/search'>
          <button>take a look </button>
        </Link>
        <Link to='/Welcome'>
          <button>home </button>
        </Link>
      </div> */}
      {/* <Switch>
        <Route exact path='/Welcome/login' component={LoginPage} />
        <Route exact path='/Welcome/signup' component={SignUpPage} />
        <Route exact path='/Welcome/search' component={SearchPage} />
        <Route exact path='/Welcome/profile' component={FreeProfile} />
      </Switch> */}
      <main className='mymain'>
        <div className='mainelements'>
          <div className='firstsection'>
            <div className='textelements1'>
              <img src={logovertical} alt='designhub.tn' className='mainlogo'></img>
              <div className='para1'>
                <p>build the team</p>
                <p>that makes it</p>
                <p>happen!</p>
                <Link to='/Welcome/signup'>
                  <button className='startproject'>start project</button>
                </Link>
              </div>
            </div>

            <div className='demo1'>
              <div className='singlefreelancer'>
                <div className='singlefree-image'>
                  <img src='https://images.unsplash.com/photo-1505503693641-1926193e8d57?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80.jpg'></img>
                </div>
                <div className='singlefree-card'>
                  <p className='singlefree-name'>Salim Bel Haj</p>
                  <p className='singlefree-job'>Graphic Designer</p>
                </div>
                <div className='singlefree-info'>
                  <p className='singlefree-hr'>40 TND/H</p>
                  <div className='singlefree-rating'>
                    <p className='singlefree-ratevalue'>3.2</p>
                    <img className='singlefree-rategraphic' src={star}></img>
                  </div>
                </div>
                <button></button>
              </div>

              <div className='singlefreelancer'>
                <div className='singlefree-image'>
                  <img src='https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80.jpg'></img>
                </div>
                <div className='singlefree-card'>
                  <p className='singlefree-name'>Maher Badr</p>
                  <p className='singlefree-job'>Motion Designer</p>
                </div>
                <div className='singlefree-info'>
                  <p className='singlefree-hr'>60 TND/H</p>
                  <div className='singlefree-rating'>
                    <p className='singlefree-ratevalue'>4.2</p>
                    <img className='singlefree-rategraphic' src={star}></img>
                  </div>
                </div>
                <button></button>
              </div>

              <div className='singlefreelancer'>
                <div className='singlefree-image'>
                  <img src='https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.jpg'></img>
                </div>
                <div className='singlefree-card'>
                  <p className='singlefree-name'>Mona Salmani</p>
                  <p className='singlefree-job'>Photographer</p>
                </div>
                <div className='singlefree-info'>
                  <p className='singlefree-hr'>90 TND/H</p>
                  <div className='singlefree-rating'>
                    <p className='singlefree-ratevalue'>4.6</p>
                    <img className='singlefree-rategraphic' src={star}></img>
                  </div>
                </div>
                <button></button>
              </div>

              <div className='singlefreelancer'>
                <div className='singlefree-image'>
                  <img src='https://images.unsplash.com/photo-1568075060053-3ee60e438f3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.jpg'></img>
                </div>
                <div className='singlefree-card'>
                  <p className='singlefree-name'>Sawsen Abda </p>
                  <p className='singlefree-job'>Web Developer</p>
                </div>
                <div className='singlefree-info'>
                  <p className='singlefree-hr'>63 TND/H</p>
                  <div className='singlefree-rating'>
                    <p className='singlefree-ratevalue'>3.8</p>
                    <img className='singlefree-rategraphic' src={star}></img>
                  </div>
                </div>
                <button></button>
              </div>
              <Link to='/Welcome/search'>
                <button className='findmore'>find more</button>
              </Link>
            </div>
          </div>

          <div className='secondsection'>
            <div className='demo2'>
              <div className='service-element'>
                <div className='service-layer'>
                  <button className='editservice'></button>
                  <div className='serviceinfo'>
                    <p className='servicename'>Stationary</p>
                    <p className='serviceprice'>
                      starting from <span>500TND</span>
                    </p>
                  </div>
                </div>
                <img
                  className='serviceimage'
                  src='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/122962759/original/914246eda560f658efa15a5066bb32596e38644f/do-awesome-business-card-letterhead-and-stationary-design-58c9.jpg'></img>
              </div>

              <div className='service-element'>
                <div className='service-layer'>
                  <button className='editservice'></button>
                  <div className='serviceinfo'>
                    <p className='servicename'>LogoDesign</p>
                    <p className='serviceprice'>
                      starting from <span>200TND</span>
                    </p>
                  </div>
                </div>
                <img
                  className='serviceimage'
                  src='https://d3ui957tjb5bqd.cloudfront.net/uploads/2017/01/Swan-by-Yuri-Kartashev-560x420.jpg'></img>
              </div>

              <div className='service-element'>
                <div className='service-layer'>
                  <button className='editservice'></button>
                  <div className='serviceinfo'>
                    <p className='servicename'>Illustration</p>
                    <p className='serviceprice'>
                      starting from <span>180TND</span>
                    </p>
                  </div>
                </div>
                <img
                  className='serviceimage'
                  src='https://tubikstudio.com/wp-content/uploads/2018/05/graphic-design-process-illustration-for-IT-blog-tubik-1-1024x768.png'></img>
              </div>

              <div className='service-element'>
                <div className='service-layer'>
                  <button className='editservice'></button>
                  <div className='serviceinfo'>
                    <p className='servicename'>Packaging</p>
                    <p className='serviceprice'>
                      starting from <span>200TND</span>
                    </p>
                  </div>
                </div>
                <img
                  className='serviceimage'
                  src='https://www.elisabethenthoven.nl/wp-content/uploads/AH_Packging_A001_small-768x687@2x.jpg'></img>
              </div>

              <div className='service-element'>
                <div className='service-layer'>
                  <button className='editservice'></button>
                  <div className='serviceinfo'>
                    <p className='servicename'>Infographic</p>
                    <p className='serviceprice'>
                      starting from <span>150TND</span>
                    </p>
                  </div>
                </div>
                <img
                  className='serviceimage'
                  src='https://static.vecteezy.com/system/resources/previews/000/660/226/non_2x/vector-isolated-workflow-and-infographic-design.jpg'></img>
              </div>

              <div className='service-element'>
                <div className='service-layer'>
                  <button className='editservice'></button>
                  <div className='serviceinfo'>
                    <p className='servicename'>FontDesign</p>
                    <p className='serviceprice'>
                      starting from <span>170TND</span>
                    </p>
                  </div>
                </div>
                <img
                  className='serviceimage'
                  src='https://www.adobe.com/content/dam/cc/us/en/products/illustrator/max2019/dt_Ai_riverflow2_660x495.jpg.img.jpg'></img>
              </div>

              <div className='service-element'>
                <img className='addnewservice' src={addnewservice}></img>
              </div>
            </div>

            <div className='textelements2'>
              <p className='freelancertitle'>freelancer?</p>
              <div className='para2'>
                <p className='parasentence'>find a project</p>
                <p className='parasentence'>and join a team</p>
                <p className='parasentence'>or create</p>
                <p className='parasentence'>your store</p>
                <p className='parasentence'>build the team</p>
                <p className='parasentence'>and sell your</p>
                <p className='parasentence'>artwork!</p>
              </div>
              <Link to='/Welcome/signup'>
                <button className='joinus'>join us</button>
              </Link>
            </div>
          </div>

          <div className='thirdsection'>
            <Slider />
          </div>
        </div>

        <Switch>
          <Route exact path='/Welcome/login' component={LoginPage} />
          <Route exact path='/Welcome/signup' component={SignUpPage} />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};
LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  alerts: PropTypes.array,
};
const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapState)(LandingPage);
