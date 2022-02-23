import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fragment, SyntheticEvent } from 'react';
import { Button, Modal, Table, TableCell } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';


export default observer(function ListModal() {
    const { contractorStore } = useStore();
    const {loadContractor,loadingContractor, getContractors, setConstractorListModal, contractorLoadingInitial, setConstractorFormModal } = contractorStore;


   function cancelContractorModalList(){
        setConstractorListModal(false);
    }
function handleOpenContractorForm(){
    setConstractorListModal(false);
    setConstractorFormModal(true);
}

function handleContractorAdd(e: SyntheticEvent<HTMLButtonElement>, id: string){
    loadContractor(id);
    setConstractorListModal(false);
}

    return (
        <>
            <Modal.Content>
                <Table celled selectable inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nazwa</Table.HeaderCell>
                            <Table.HeaderCell>NIP</Table.HeaderCell>
                            <Table.HeaderCell>Ulica</Table.HeaderCell>
                            <Table.HeaderCell>Nr</Table.HeaderCell>
                            <Table.HeaderCell>Miejscowość</Table.HeaderCell>
                            <Table.HeaderCell>Uwagi</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {getContractors.map(contractor => (
                        <Fragment key={contractor.id}>
                            <Table.Body>
                                <Table.Row key={contractor.id} >
                                    <Table.Cell >{contractor.name}</Table.Cell>
                                    <Table.Cell>{contractor.taxNumber}</Table.Cell>
                                    <Table.Cell>{contractor.street}</Table.Cell>
                                    <Table.Cell >{contractor.streetNumber}</Table.Cell>
                                    <Table.Cell>{contractor.city}</Table.Cell>
                                    <Table.Cell>{contractor.info}</Table.Cell>
                                    <TableCell>
                                    <Button
                          name={contractor.id}
                          loading={loadingContractor}
                          onClick={(e) => handleContractorAdd(e, contractor.id)}

                          content="Wybierz"
                          positive
                        />
                                    </TableCell>
                                </Table.Row>
                            </Table.Body>
                        </Fragment>
                    ))}
                </Table>
            </Modal.Content>
            <Modal.Actions>
            <Button floated='right' onClick={cancelContractorModalList} type='button' content='Anuluj' loading={contractorLoadingInitial} />
            <Button floated='right' onClick={() => handleOpenContractorForm()} positive type='button' content='Dodaj Nowy' loading={contractorLoadingInitial} />
          </Modal.Actions>
        </>
    )
})