import React, { Component } from 'react';
import './slider.css';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import SignUpPage from './SignUpPage';

export default class Slider extends Component {
  render() {
    return (
      <div className='my-slider'>
        <div className='CSSgal'>
          <s id='s1'></s>
          <s id='s2'></s>
          <s id='s3'></s>
          <s id='s4'></s>

          <div className='slider'>
            <div className='slide-a'>
              <div className='slide-info'>
                <p className='projectname'>Project Gorilla</p>
                <p className='projectdate'>Today</p>
                <div className='displayed-project-info'>
                  <p>Budget: 300TND</p>
                  <p>Designer: Ahmed Gali</p>
                  <p>Duration: 3 days</p>
                </div>
                <Link to='/Welcome/search'>
                  <button className='slidecontactdesigner'>contact designer</button>
                </Link>
                <Link to='/Welcome/signup'>
                  <button className='slidestartproject'>start project</button>
                </Link>
              </div>

              <img src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/106621255/original/624302966cfa86ae9528555f222cdb20bd3398ba/create-perfect-stationary-design-and-brand-identity.jpg'></img>
            </div>

            <div className='slide-a'>
              <div className='slide-info'>
                <p className='projectname'>Project Diva</p>
                <p className='projectdate'>Today</p>
                <div className='displayed-project-info'>
                  <p>Budget: 400TND</p>
                  <p>Illustrator: Samy Joudi</p>
                  <p>Duration: 6 days</p>
                </div>
                <Link to='/Welcome/search'>
                  <button className='slidecontactdesigner'>contact designer</button>
                </Link>
                <Link to='/Welcome/signup'>
                  <button className='slidestartproject'>start project</button>
                </Link>
              </div>

              <img src='https://pro2-bar-s3-cdn-cf1.myportfolio.com/9cce6f54fefe8db8438049bed266c6ec/92fd3036-2885-4536-a28a-d56dd794f4ed_car_4x3.jpg?h=8bf5ccae1baa108f3843030c8562b66d'></img>
            </div>

            <div className='slide-a'>
              <div className='slide-info'>
                <p className='projectname'>Project Steamer</p>
                <p className='projectdate'>Today</p>
                <div className='displayed-project-info'>
                  <p>Budget: 800TND</p>
                  <p>Designer: Salma Mohamed</p>
                  <p>Duration: 15 days</p>
                </div>
                <Link to='/Welcome/search'>
                  <button className='slidecontactdesigner'>contact designer</button>
                </Link>
                <Link to='/Welcome/signup'>
                  <button className='slidestartproject'>start project</button>
                </Link>
              </div>

              <img src='https://cdn.dribbble.com/users/501212/screenshots/3915613/dribbble.png'></img>
            </div>

            <div className='slide-a'>
              <div className='slide-info'>
                <p className='projectname'>Project Color-x</p>
                <p className='projectdate'>Today</p>
                <div className='displayed-project-info'>
                  <p>Budget: 270TND</p>
                  <p>Designer: Sawsen Naji</p>
                  <p>Duration: 5 days</p>
                </div>
                <Link to='/Welcome/search'>
                  <button className='slidecontactdesigner'>contact designer</button>
                </Link>
                <Link to='/Welcome/signup'>
                  <button className='slidestartproject'>start project</button>
                </Link>
              </div>

              <img src='https://www.getfractals.com/static/images/penrose_fractal_filter_prism_photography_portrait_640.jpg'></img>
            </div>
          </div>

          <div className='prevNext'>
            <div>
              <a href='#s4'></a>
              <a href='#s2'></a>
            </div>
            <div>
              <a href='#s1'></a>
              <a href='#s3'></a>
            </div>
            <div>
              <a href='#s2'></a>
              <a href='#s4'></a>
            </div>
            <div>
              <a href='#s3'></a>
              <a href='#s1'></a>
            </div>
          </div>

          <div className='bullets'>
            <a href='#s1'>1</a>
            <a href='#s2'>2</a>
            <a href='#s3'>3</a>
            <a href='#s4'>4</a>
          </div>
        </div>
        <Switch>
          <Route exact path='/Welcome/login' component={LoginPage} />
          <Route exact path='/Welcome/signup' component={SignUpPage} />
        </Switch>
      </div>
    );
  }
}
