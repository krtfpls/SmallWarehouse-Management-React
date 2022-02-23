import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import { IProducts } from '../../../app/models/Products';


interface Props {
    items: IProducts
}

export default function ProductListItem({items}: Props) {

    return (
      <>
      <Table.Row key={items.id} >
        <Table.Cell >{items.name}</Table.Cell>
        <Table.Cell>{items.category}</Table.Cell>
        <Table.Cell>{items.serialNumber}</Table.Cell>
        <Table.Cell >{items.quantity} szt.</Table.Cell>
        <Table.Cell>{items.minLimit} min. szt.</Table.Cell>
        <Table.Cell>{items.priceNetto} zł</Table.Cell>
        <Table.Cell >
                   <Button 
                    as={Link}
                    to={`/Products/${items.id}`}
                    
                    content="Wybierz"
                    color="brown"
                  />
        </Table.Cell>
      </Table.Row>
      </>

    )
}