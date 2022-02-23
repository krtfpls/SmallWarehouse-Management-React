import React, { Fragment } from "react";
import { Button, Placeholder, Segment } from "semantic-ui-react";

export default function DocumentListItemPlaceholder() {
    return (
        <Fragment>
            <Placeholder fluid style={{ marginTop: 25 }}>
                <Segment.Group>
                    <Segment style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                    </Segment>
                    <Segment clearing>
                        <Button disabled color='brown' floated='right' content='Podgląd' />
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    )
}