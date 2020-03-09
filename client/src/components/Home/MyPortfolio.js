import React, { Fragment, useEffect } from 'react';
import AddPortfolio from '../PortfolioItems/AddPortfolio';
import { connect } from 'react-redux';
import { getCurrentPortfolio } from '../../actions/portfolio';
import PortfolioItem from '../PortfolioItems/PortfolioItem';
const Myportfolio = ({ getCurrentPortfolio, portfolio, loading }) => {
  useEffect(() => {
    getCurrentPortfolio();
  }, [getCurrentPortfolio]);

  if (loading || portfolio === null)
    return (
      <div className='container'>
        <div className='d-flex justify-content-center text-primary'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );
  return (
    <Fragment>
      <h1 className='hubmy hubblue-text'>Portfolio</h1>
      {portfolio.work.length > 0 ? (
        portfolio.work.map(port => <PortfolioItem key={port._id} port={port} />)
      ) : (
        <h4 className='hubgreen-text'>No Work found</h4>
      )}
      <AddPortfolio />
    </Fragment>
  );
};
const mapState = state => ({
  portfolio: state.portfolio.portfolio,
  loading: state.portfolio.loading,
});

export default connect(mapState, { getCurrentPortfolio })(Myportfolio);
