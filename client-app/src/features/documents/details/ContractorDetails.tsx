import React from 'react';
import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react"
import { IContractor } from "../../../app/models/Contractor"
import { useStore } from "../../../app/stores/store";
import ContractorForm from "../form/ContractorForm";
import ContractorListModal from "../form/Modals/ContractorListModal";

interface Props {
  tempContractor: IContractor,
  buttonEnbl: boolean
}

export default observer(function ContractorHelper({ tempContractor, buttonEnbl }: Props) {

  const {contractorStore}= useStore();
  const {loadAllContractors, setConstractorListModal, contractorListModal , setSelectedContractor, contractorFormModal} = contractorStore;
  
  useEffect(()=> {
   
    setSelectedContractor({
      id: '',
      name: '',
      info: '',
      street: '',
      streetNumber: '',
      city: '',
      taxNumber: ''});
  },[setSelectedContractor])

  function handleOpenContractorList() {
    loadAllContractors();
    setConstractorListModal(true);
  }

  return (
    <>
      <Segment.Group >
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='mini' src='/assets/kontrahent.jpeg' />
              <Item.Content>
                <Item.Header as='a'>{tempContractor.name}</Item.Header>
                <Item.Meta>{tempContractor.taxNumber}</Item.Meta>
                <Item.Description>
                  {tempContractor.street} {tempContractor.streetNumber}
                </Item.Description>
                <Item.Description>
                  {tempContractor.city}
                </Item.Description>
                <Item.Extra>{tempContractor.info}</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
          <Modal
        open={contractorListModal}>
          <ContractorListModal />
          </Modal>
          <Modal open={contractorFormModal}>
          <ContractorForm/>
          </Modal>
        </Segment>
        
        <Segment>
          <Button positive content="Dodaj" fluid onClick={()=>(handleOpenContractorList())} disabled={buttonEnbl}/>
        </Segment>
      </Segment.Group>
    </>
  )
})