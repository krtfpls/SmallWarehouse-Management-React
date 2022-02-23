import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProductListItem from './ProductsListItem';

export default observer(function ProductsList() {
  const { ProductStore } = useStore();
  const { getProducts } = ProductStore;

  return (
    <>
     <Table celled selectable inverted>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Nazwa</Table.HeaderCell>
      <Table.HeaderCell>Grupa</Table.HeaderCell>
      <Table.HeaderCell>Numer Seryjny</Table.HeaderCell>
      <Table.HeaderCell>Ilość</Table.HeaderCell>
      <Table.HeaderCell>Limit Min.</Table.HeaderCell>
      <Table.HeaderCell>Cena Netto</Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    {getProducts.map( sItems=> (
      <Fragment key={sItems.id}> 
     
    <Table.Body>
                <ProductListItem key={sItems.id} items={sItems} />
    </Table.Body>
    </Fragment>
    ))}
   </Table>
     </>
)})