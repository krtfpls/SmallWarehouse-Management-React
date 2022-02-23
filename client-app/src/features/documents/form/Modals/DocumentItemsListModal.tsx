import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { IProducts } from "../../../../app/models/Products";
import { useStore } from "../../../../app/stores/store";
import DocumentItemsFormModal from "./DocumentItemsFormModal";

export default observer(function DocumentItemsListModal(){

    const { ProductStore, modalStore} = useStore();
    const {getProducts, loading, loadingInitial, setSelectedProduct, loadProducts, clearAllProductStore} = ProductStore;

    useEffect(() => {
      clearAllProductStore();
        loadProducts();

    },[loadProducts, clearAllProductStore])

    const target ='';

    function handleStorageItemAdd(e: SyntheticEvent<HTMLButtonElement>, item: IProducts) {

        setSelectedProduct(item);
        modalStore.closeModal();
        modalStore.openModal(<DocumentItemsFormModal/>, 'small');
      }

      function handleOpenForm() {
        modalStore.closeModal();
        modalStore.openModal(<DocumentItemsFormModal isEmpty={true}/>, 'small');
      }

    return(
        <>
        <Table celled selectable inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nazwa</Table.HeaderCell>
            <Table.HeaderCell>Grupa</Table.HeaderCell>
            <Table.HeaderCell>Numer seryjny</Table.HeaderCell>
            <Table.HeaderCell>Ilość</Table.HeaderCell>
            <Table.HeaderCell>Limit min.</Table.HeaderCell>
            <Table.HeaderCell>Cena netto</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        {getProducts.map(items => (
          <Fragment key={items.id}>
            
            <Table.Body>
              <Table.Row key={items.id} >
                <Table.Cell >{items.name}</Table.Cell>
                <Table.Cell>{items.category}</Table.Cell>
                <Table.Cell>{items.serialNumber}</Table.Cell>
                <Table.Cell >{items.quantity}</Table.Cell>
                <Table.Cell> {items.minLimit}</Table.Cell>
                <Table.Cell> {items.priceNetto}</Table.Cell>
                <Table.Cell>
                  <Button
                    name={items.id}
                    loading={loading && target === items.id}
                    onClick={(e) => handleStorageItemAdd(e, items)}

                    content="Wybierz"
                    color="red"
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Fragment>
        ))}
      </Table>

      <Button floated='right' onClick={() => modalStore.closeModal()} type='button' content='Anuluj' loading={loadingInitial} />
      <Button floated='right' onClick={() => handleOpenForm()} positive type='button' content='Dodaj Nowy' loading={loadingInitial} />
      </>
    )
})