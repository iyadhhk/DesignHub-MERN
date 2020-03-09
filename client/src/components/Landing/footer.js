import './footer.css';
import React, { Component } from 'react';
import facebook from '../../icons/facebook.svg';
import twitter from '../../icons/twitter.svg';
import linkedin from '../../icons/linkedin.svg';
// import footer from '../Landing/svg/footer.svg';

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='footercolumns'>
          <div className='footer1'>
            <p className='footerboldtext footerlefttext'>Need help?</p>
            <p>+216 20202020</p>
            <p>support@designhub.tn</p>
            <p className='footerboldtext'>Follow us</p>
            <div className='footericons'>
              <a href='#'>
                <img src={facebook} alt='desginhub@facebook' height='auto'></img>
              </a>
              <a href='#'>
                <img src={twitter} alt='desginhub@twitter' height='auto'></img>
              </a>
              <a href='#'>
                <img src={linkedin} alt='desginhub@linkedin' height='auto'></img>
              </a>
            </div>
          </div>
          <div className='footer2'>
            <p className='footerboldtext footerlefttext'>Team</p>
            <p>Iyadh Hakiri</p>
            <p>Faten Ouni</p>
            <p>Wafa Najari</p>
          </div>
          <div className='footer3'>
            <p>All rights reserved DesignHub©</p>
            <p>2020</p>
          </div>
        </div>
      </div>
    );
  }
}
