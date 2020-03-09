import React, { Fragment, useEffect } from 'react';
import AddProduct from '../StoreItems/AddProduct';
import { connect } from 'react-redux';
import { getCurrentStore } from '../../actions/store';
import StoreItem from '../StoreItems/StoreItem';
const MyStore = ({ getCurrentStore, store, loading }) => {
  useEffect(() => {
    getCurrentStore();
  }, [getCurrentStore]);

  if (loading || store === null)
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
    <div className='hubcontainer'>
      <h1 className='hubmy hublarge hubblue-text'>My Store</h1>
      {store.product.length > 0 ? (
        store.product.map(prod => <StoreItem key={prod._id} prod={prod} />)
      ) : (
        <h4 className='hubgreen-text'>No Products Found</h4>
      )}
      <AddProduct />
    </div>
  );
};
const mapState = state => ({
  store: state.store.store,
  loading: state.store.loading,
});

export default connect(mapState, { getCurrentStore })(MyStore);
