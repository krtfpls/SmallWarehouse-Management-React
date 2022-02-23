import React, { useEffect } from 'react';
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { IProducts } from "../../../../app/models/Products";
import ProductForm from "../../../products/form/ProductForm";

interface Props{
  isEmpty?: boolean
}

export default observer(function DocumentItemsFormModal({isEmpty}: Props) {
    const { ProductStore, documentStore, modalStore } = useStore();
    const { getValidationSchema,  selectedProduct, clearSelectedItem, loading } = ProductStore;
    const {getDocumentItem, addDocumentItems}= documentStore;

    useEffect(()=> {
      if (isEmpty)
        clearSelectedItem();
    }, [isEmpty, clearSelectedItem])
  
    function handleFormSubmit(item: IProducts ) {
        if (item.id.length === 0) {
          item.id = uuid();
        }
        handleAddItemToDocument(item);
        clearSelectedItem();
        modalStore.closeModal();
      }

      function handleAddItemToDocument(item: IProducts) {
        let update = getDocumentItem(item.id);
        if (!update) {
          addDocumentItems(item);
        }
        else {
          alert('pozycja znajduje się już na liście. Zweryfikuj skorygowaną ilość');
          addDocumentItems(item);
        }
      }

    return(
        <Formik validationSchema={getValidationSchema}
                enableReinitialize
                initialValues={selectedProduct}
                onSubmit={values => handleFormSubmit(values)}>
                  {({handleSubmit, isValid, isSubmitting, dirty}) => (
                      <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                      <ProductForm/>
                      <Button 
                        floated='right' 
                        onClick={() => modalStore.closeModal()} 
                        type='button' 
                        content='Anuluj' />
                      <Button 
                        disabled={isSubmitting || !dirty || ! isValid}
                        loading={loading || isSubmitting} 
                        floated='right' 
                        positive 
                        type='submit' 
                        content='Zatwierdź' />  
                      </Form>
              )}
            </Formik>
    )
})