import React from 'react';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DocumentListItem from './DocumentListItem';

export default observer(function DocumentsList() {
  const { documentStore} = useStore();
  const { groupedDocuments } = documentStore;
 
  return (
    <>
    {groupedDocuments.map(([group, doc]) => (
        <Fragment key={group}>
            <Header sub color='brown'>
                {group}
            </Header>
            {doc.map(_doc => (
                <DocumentListItem key={_doc.id} doc={_doc} />
            ))}
        </Fragment>
    ))}
</>
)})