import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ProductsDetails(){

    const {ProductStore} = useStore();
    const {selectedProduct: item, loadProduct, loadingInitial} = ProductStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadProduct(id);
    }, [id, loadProduct])

    if (loadingInitial || !item) return  <LoadingComponent/>;

    return(
        <Container style={{ marginTop: "7em" }} >
        <Card fluid>
            <Image size="medium"  src={`/assets/categoryImages/${item.category}.png`}
            
             />
            <Card.Content >
                <Card.Header>{item.name}</Card.Header>
                <Card.Description>
                    <div>Grupa: {item.category}</div>
                    <div>Nr seryjny: {item.serialNumber}</div>
                    <div>Stan: {item.quantity} szt.</div>
                    <div>Cena netto: {item.priceNetto} zł</div>
                    <div>Zapas minimalny: {item.minLimit} szt.</div>
                    <div>Opis: {item.description}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
               <Button.Group floated='right'>
                   <Button as={Link} to={`/manage/${item.id}`}  basic color='green' content='Edytuj'/>
                   <Button as={Link} to='/Products' basic color='red' content='Anuluj'/>
                   </Button.Group>
            </Card.Content>
        </Card>
        </Container>
    );
})