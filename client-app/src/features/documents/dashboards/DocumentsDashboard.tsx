import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Container, Divider, Grid, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store"
import DocumentsList from "./DocumentsList";
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import DocumentFilters from './DocumentFilters';
import DocumentListItemPlaceholder from './DocumentListItemPlaceholder';

export default observer(function DocumentsDashboard() {
  const { documentStore } = useStore();
  const { loadAllDocuments, setPagingParams, pagination, documentLoadingInitial, clearAll } = documentStore;

  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadAllDocuments().then(() => setLoadingNext(false))
  }

  useEffect(() => {
    loadAllDocuments();

    return(() =>{
      clearAll()
    })
  }, [loadAllDocuments, clearAll]);

  return (
    <Container style={{ marginTop: "7em" }} >
    <Grid doubling columns={2} reversed='tablet vertically mobile vertically'>
      <Grid.Column width="10">
        {documentLoadingInitial && !loadingNext ? (
          <>
            <DocumentListItemPlaceholder />
            <DocumentListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
            initialLoad={false}
          >
            <DocumentsList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <DocumentFilters />
      </Grid.Column>
      <Grid.Column width={10}>
      {  !!pagination && (pagination.currentPage < pagination.totalPages) ?
           <Divider horizontal >Przewiń w dół by załadowac więcej</Divider> :
           <Divider horizontal>koniec</Divider>}
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
    </Container>
  )
})