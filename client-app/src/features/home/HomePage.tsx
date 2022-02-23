import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore()
    
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text >
                <Header as='h1' inverted>
                    Magazyn
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Witaj w swoim magazynie' />
                        <Button as={Link} to='Products' size='huge' inverted>
                            Lista twoich urządzeń
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />, 'mini' )} size='huge' inverted>
                            Zaloguj
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm/>, 'mini')} size='huge' inverted>
                            Rejestracja
                        </Button>
                    </>
                )}

            </Container>
        </Segment>
    )
})