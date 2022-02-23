import React from 'react';
import { observer } from "mobx-react-lite"
import { Button, Form, Modal, Segment } from "semantic-ui-react"
import { IContractor } from "../../../app/models/Contractor";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
export default observer(function ContractorHelper() {
  
  const {contractorStore}= useStore();
  const {setConstractorFormModal, setConstractorListModal, createContractor, loadingContractor, updateContractor}= contractorStore;

  const tempContractor = {
        id: '',
        name: '',
        info: '',
        street: '',
        streetNumber: '',
        city: '',
        taxNumber: ''
  };

      function cancelContractorModalList(){
        setConstractorFormModal(false);
        setConstractorListModal(false);
      }

      function handleAddContractorForm(tempContractor: IContractor){
        if (tempContractor.id.length===0){
          let newContractor={...tempContractor, id: uuid()};
            createContractor(newContractor).then(()=>setConstractorFormModal(false));
          }
        else{
          updateContractor(tempContractor).then(()=>setConstractorFormModal(false));;
        }
      }

      const validationSchema = Yup.object({
        name: Yup.string().required('Nazwa jest wymagana').max(100, 'Maksymalnie 100 znaków'),
        taxNumber: Yup.string().nullable().max(30),
        street: Yup.string().required('Ulica jest wymagana').max(100),
        streetNumber: Yup.string().required('Nr ulicy jest wymagany').max(20),
        city: Yup.string().required('Miasto jest wymagane').max(100),
        info: Yup.string().nullable().max(300)
      })

    return(
        <>
        <Modal.Content>
            <Segment clearing>
              <Formik
              validationSchema= {validationSchema}
              enableReinitialize
              initialValues={tempContractor}
              onSubmit={handleAddContractorForm}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                  <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name="name" placeholder="Wpisz nazwę tutaj" label="Nazwa"/>
                    <MyTextInput name="taxNumber" placeholder="Wpisz NIP tutaj" label='NIP'/>
                    <MyTextInput name="street" placeholder="Wpisz nazwę ulicy tutaj" label='Ulica'/>
                    <MyTextInput name="streetNumber" placeholder="Wpisz numer ulicy tutaj" label='Nr'/>
                    <MyTextInput name="city" placeholder="Wpisz nazwę miasta tutaj" label='Miasto'/>
                    <MyTextArea rows={3} placeholder="Wpisz uwagi tutaj" name="info" label='Uwagi'/>

            <Button floated='right' 
              onClick={cancelContractorModalList} 
              type='button' 
              content='Anuluj' 
              loading={loadingContractor}/>
            <Button floated='right' 
              disabled={isSubmitting || !isValid || !dirty }
              positive  
              content='Dodaj'
              type='submit' 
              loading={loadingContractor}/>
       
                  </Form>
                )}
              </Formik> 
              </Segment>  
        </Modal.Content>           
        </>
    )
})