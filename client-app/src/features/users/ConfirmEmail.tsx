import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import agentAxios from "../../app/api/agentAxios";
import useQuery from "../../app/common/util/hooks";
import { EmailValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import LoginForm from "./LoginForm";

export default function ConfirmEmail() {
    const { modalStore } = useStore();      

    // const email = useQuery().get('email') as string;
    // const token = useQuery().get('token') as string;

    const Status = {
        Verifying: 'Verifying',
        Failed: 'Failed',
        Success: 'Success'
    }

    const [status, setStatus] = useState(Status.Verifying);

    const postValues:EmailValues= {
        email:useQuery().get('email') as string,
        token:useQuery().get('token') as string
        };

    function handleConfirmEmailResend() {
        agentAxios.Account.resendEmailConfirm(postValues).then(() => {
            toast.success('Przesłano ponownie link weryfikacyjny- sprawdź proszę swoją skrzynkę email');
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        agentAxios.Account.verifyEmail(postValues).then(() => {
            setStatus(Status.Success)
        }).catch(() => {
            setStatus(Status.Failed)
        })
    }, [Status.Failed, Status.Success, postValues])

    function getBody() {
        switch (status) {
            case Status.Verifying:
                return <p>Trwa weryfikacja...</p>;
            case Status.Failed:
                return (
                    <div>
                        <p>Weryfikacja nie powiodła się. Jeżeli nie dotarł link weryfikacyjny, spróbuj przesłąć go ponownie.</p>
                        <Button primary onClick={handleConfirmEmailResend} size='huge' content="Prześlij ponownie" />
                    </div>
                )
            case Status.Success:
                return (
                    <div>
                        <p> Email zweryfikowany- teraz możesz się zalogować</p>
                        <Button primary onClick={() => modalStore.openModal(<LoginForm />, 'tiny')} size='huge' content='Zaloguj'/>
                    </div>
                );
        }
    }

    return (
        <Container style={{ marginTop: "7em" }} >
        <Segment placeholder textAlign="center">
            <Header icon>
                <Icon name="envelope"/>
                Weryfikacja email
            </Header>
            <Segment.Inline>
                {getBody()}
            </Segment.Inline>
        </Segment>
        </Container>
    )

}