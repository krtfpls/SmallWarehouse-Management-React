import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return(
        <Container style={{ marginTop: "7em" }} >
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Oops - szukaliśmy wszędzie ale nie mogliśmy tego znaleźć.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/documents' primary>
                    Powrót do listy dokumentów
                </Button>
            </Segment.Inline>
        </Segment>
        </Container>
    )
}