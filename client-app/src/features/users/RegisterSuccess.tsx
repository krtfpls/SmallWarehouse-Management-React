import React from "react";
import { toast } from "react-toastify";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import agentAxios from "../../app/api/agentAxios";
import useQuery from "../../app/common/util/hooks";
import { EmailValues } from "../../app/models/user";

export default function RegisterSuccess() {
   // const email = useQuery().get('email') as string; 

    const postValues:EmailValues = {
        email:useQuery().get('email') as string,
        token:useQuery().get('token') as string

    }

    function handleConfirmEmailResend() {
        agentAxios.Account.resendEmailConfirm(postValues).then(() => {
            toast.success('Przesłano ponownie link weryfikacyjny- sprawdź proszę swoją skrzynkę email');
        }).catch(error => console.log(error));
    }

    return (
        <Container style={{ marginTop: "7em" }} >
        <Segment placeholder textAlign="center">
            <Header icon color='green'>
                <Icon name="check"/>
                    Rejestracja przebiegła poprawnie!
            </Header>
            <p>Sprawdź proszę swoją skrzynkę email (również folder spam) - powinien dotrzeć link werryfikacyjny</p>
            {postValues.email &&
                <>
                    <p> Nie dotarł link weryfikacyjny? Kliknij poniższy przycisk</p>
                    <Button primary onClick={handleConfirmEmailResend}
                     content='Prześlij ponownie' size="huge"/>
                </>
            }
        </Segment>
        </Container>
    )
}