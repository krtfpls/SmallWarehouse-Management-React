import React from 'react';
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { IProducts } from "../../../app/models/Products";
import { Formik } from "formik";
import ProductForm from "../form/ProductForm";

export default observer(function ProductEdit(){
      
    const history = useNavigate();
    const {ProductStore} = useStore();
    const {setSelectedProduct, clearSelectedItem, createProduct, getValidationSchema,
        updateProduct, loadProduct, loadingInitial, loading, selectedProduct} = ProductStore;   
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        clearSelectedItem();
        if (id) 
        loadProduct(id).then(item => setSelectedProduct(item!));
    }, [id, loadProduct, clearSelectedItem, setSelectedProduct]);

    function handleFormSubmit(item: IProducts){
        if (item!.id.length===0)
        {
            let newProduct: IProducts={...item!, id:uuid()};
            createProduct(newProduct).then(() => history(`/Products/${newProduct.id}`))
         
           }   
        else {
            updateProduct(item!).then(() => history(`/Products/${selectedProduct!.id}`))
        }             
    }

    if (loadingInitial) return <LoadingComponent inverted={false} content='Ładuję urządzenie...'/>

    return(
        <Container style={{ marginTop: "7em" }} >
        <Segment>
            <Formik 
                validationSchema={getValidationSchema}
                enableReinitialize
                initialValues={selectedProduct}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <ProductForm />
                        <Button 
                            as={Link} 
                            to={`/Products/${selectedProduct?.id}`}   
                            floated='right' 
                            type='button' 
                            content='Anuluj'/>
                        <Button 
                            disabled={isSubmitting || !dirty || ! isValid}
                            loading={loading || isSubmitting} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Zatwierdź'/>   
                    </Form>
                )}
            </Formik>
        </Segment>
        </Container>
    );
})

