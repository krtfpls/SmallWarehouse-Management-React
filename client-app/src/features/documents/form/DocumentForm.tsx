import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import {  useNavigate } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Form, Grid, Icon, Label, Message, Segment, Table } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import ContractorDetails from '../details/ContractorDetails';
import DocumentItemsFormModal from './Modals/DocumentItemsFormModal';
import DocumentItemsListModal from './Modals/DocumentItemsListModal';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { IDocuments } from '../../../app/models/Documents';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { IProducts } from '../../../app/models/Products';

export default observer(function DocumentForm() {

  const history = useNavigate();

  const { documentStore, ProductStore, contractorStore, modalStore } = useStore();

  const { documentLoadingInitial, loading, createDocument, clearSelectedDocument, clearDocumentItems, 
        addDocumentItems, removeDoumentItems, getAllDocumentItems, setLoadingInitial, loadDocumentById, selectedDocument,
        setSelectedDocument } = documentStore;
  const { selectedContractor, setSelectedContractor, clearSelectedContractor } = contractorStore;
  const { clearSelectedItem, setSelectedProduct } = ProductStore;

  const [lock, setLock] = useState(false);
  const { type, id } = useParams<{ type: string, id: string }>();
 
  useEffect(() => {
    
    clearSelectedItem();
    clearSelectedDocument();
    clearDocumentItems();
    clearSelectedContractor();
    
  }, []);

  useEffect(() => {

    if (id) {
      loadDocumentById(id).then(_doc => setSelectedDocument(_doc!)).then(() => setSelectedContractor(selectedDocument!.contractor!))
        .then(() => selectedDocument.products.forEach(element => {
          addDocumentItems(element);
         }));

      setLock(true);
    }
    else {
      setLoadingInitial(false);
      setLock(false);

    }

  }, [id, loadDocumentById, setSelectedDocument, setLoadingInitial, setSelectedContractor, 
      selectedDocument, addDocumentItems ]);

  function handleDeleteItem(id: string) {
    removeDoumentItems(id);
  }

  function handleSubmit(item: IDocuments) {
    if (item.id.length === 0) {

      item.contractor = selectedContractor;
      item.products = getAllDocumentItems;
      item.name = type!;
      const newdocument = { ...item, id: uuid() };
      if (type === 'WZ' || type === 'PZ')
      createDocument(newdocument).then(() => history('/Documents'));
      else {
        alert('Nie rozpoznaje typu dokumentu. Dodanie do bazy nie jest możliwe');
      }
    }

    else {
      alert(`Utworzonych dokumentów nie można modyfikować,
      w celu skorygowania stanów utwórz dokument przeciwny`);
    }

  }


  // !!!!!!!!!!!!!!!!!! Form Storage Item handle !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function handleOpenForm() {
    modalStore.openModal(<DocumentItemsFormModal />, 'small')
  }

  function handleStorageItemAdd(e: SyntheticEvent<HTMLButtonElement>, item: IProducts) {

    setSelectedProduct(item);
    handleOpenForm();
  }

  const validationSchema = Yup.object().shape({
    date: Yup.string().required('Podaj datę'),
    number: Yup.string().required('Podaj numer dokumentu').max(100, 'Maksymalnie 100 znaków'),

  })


  if (documentLoadingInitial) return <LoadingComponent inverted={false} content='Ładuję Formularz...' />

  // -------------------------- !!!!!!!! View !!!!!!!!!! -----------------------------------------
  return (
    <>
       <Container style={{ marginTop: "7em" }} >
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={selectedDocument}
        onSubmit={(values) => handleSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Grid doubling columns={2}>
            <Grid.Column width={4}>
              <ContractorDetails tempContractor={selectedContractor} buttonEnbl={lock} />
              {(selectedContractor.id.length < 1) && <Message warning >Wybierz Dostawcę</Message>}
            </Grid.Column>
            <Grid.Column width={12}>
              <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <Segment.Group>
                  <Segment>
                    <Segment>

                      <Label size="huge">
                        Dokument {selectedDocument.name}
                      </Label>
                      <MyTextInput label='Numer' name="number" placeholder="Numer" readOnly={lock} />
                      <MyDateInput
                        name="date"
                        placeholderText='Data'
                        dateFormat='dd MMMM, yyyy'
                        readOnly={lock}
                      />
                    </Segment>
                    <Segment>
                      <h2>Urządzenia</h2>
                      <Table compact celled >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Nazwa</Table.HeaderCell>
                            <Table.HeaderCell>Kategoria</Table.HeaderCell>
                            <Table.HeaderCell>Nr Seryjny</Table.HeaderCell>
                            <Table.HeaderCell>Ilość</Table.HeaderCell>
                            <Table.HeaderCell />

                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {getAllDocumentItems.map(item => {
                            return (
                              <Fragment key={item.id}>
                                <Table.Row>
                                  <Table.Cell>{item.name}</Table.Cell>
                                  <Table.Cell>{item.category}</Table.Cell>
                                  <Table.Cell>{item.serialNumber}</Table.Cell>
                                  <Table.Cell>{item.quantity}</Table.Cell>
                                  <Table.Cell collapsing >
                                    <Button type="button"
                                      content="Usuń"
                                      color="red"
                                      onClick={() => handleDeleteItem(item.id)} disabled={lock} />

                                    <Button type="button"
                                      content="Edytuj"
                                      color="green"
                                      onClick={(e) => handleStorageItemAdd(e, item)} disabled={lock} />
                                  </Table.Cell>
                                </Table.Row>
                              </Fragment>
                            )
                          })}
                        </Table.Body>
                        <Table.Footer fullWidth>
                          <Table.Row>

                            <Table.HeaderCell colSpan='6'>
                              <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                type="button"
                                size='small'
                                onClick={() => modalStore.openModal(<DocumentItemsListModal />, 'large')}
                                disabled={lock}>
                                <Icon name='add circle' />
                                Dodaj
                              </Button>
                            </Table.HeaderCell>

                          </Table.Row>
                        </Table.Footer>
                      </Table>
                    </Segment>
                    <Button.Group floated='right'>
                      <Button as={Link} to={'/Documents'} type='button' content='Anuluj' negative={lock} />

                      <Button
                        loading={loading}
                        positive
                        type='submit'
                        content='Zatwierdź'
                        disabled={lock || isSubmitting || !isValid || !dirty || selectedContractor.id.length < 1 || getAllDocumentItems.length < 1}
                      />
                    </Button.Group>

                    {(getAllDocumentItems.length < 1) && <Message warning>Brak Wybranych urządzeń</Message>}

                  </Segment>
                </Segment.Group>
              </Form>

            </Grid.Column>
          </Grid>
        )}
      </Formik>
      </Container>
    </>
  );
})


