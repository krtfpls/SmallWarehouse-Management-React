import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Container, Divider, Grid, Loader } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ProductsList from './ProductsList';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ProductFilters from './ProductFilters';

export default observer (function ProductDashboard(){
  const {ProductStore} = useStore();
  const {loadProducts, setPagingParams, pagination, clearAllProductStore} = ProductStore;

  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage +1));
    loadProducts().then(() => setLoadingNext(false))
  }

  useEffect( () => {
    clearAllProductStore();
      loadProducts();

      return() => {
        clearAllProductStore();
      }
    }, [ loadProducts, clearAllProductStore]);

if (ProductStore.loadingInitial && !loadingNext) 
  return (
  <LoadingComponent inverted={false} content='Momencik...'/>
  )


  
  return (
    <Container style={{ marginTop: "7em" }} >
      <Grid doubling columns={2} reversed='tablet vertically mobile vertically'>
        <Grid.Column width={12}>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
            initialLoad={false}
          >
              <ProductsList/>
          </InfiniteScroll>
                  
        </Grid.Column>
        <Grid.Column width={4}>
        <ProductFilters/>
        </Grid.Column>
        <Grid.Column width={12}>
          {  !!pagination && (pagination.currentPage < pagination.totalPages) ?
           <Divider horizontal >Przewiń w dół by załadowac więcej</Divider> :
           <Divider horizontal>koniec</Divider>}
          <Loader active={loadingNext}/>
        </Grid.Column>
      </Grid>
      </Container>
    );
})