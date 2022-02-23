import { format } from "date-fns";
import pl from "date-fns/locale/pl";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { IDocuments } from "../../../app/models/Documents";

interface Props {
  doc: IDocuments;
}

export default observer(function DocumentListItem({ doc }: Props) {
  return (
    <>
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src='/assets/kontrahent.jpeg' />
            <Item.Content>
              
              <Item.Header as={Link} to={`/Documents/${doc.name}/${doc.id}`}>
                {doc.name} {doc.number}
              </Item.Header>
              <Item.Meta floated="right">{format(doc.date!, 'dd MMM yyyy', {locale: pl})}</Item.Meta>
              <Item.Description>{doc.contractor.name} </Item.Description>
              <Item.Description>{doc.contractor.street} {doc.contractor.streetNumber} {doc.contractor.city}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/Documents/${doc.name}/${doc.id}`}
          color="brown"
          floated="right"
          content="Podgląd"
        />
      </Segment>
    </Segment.Group>
    </>
  )
})
