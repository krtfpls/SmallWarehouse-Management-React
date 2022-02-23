import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown, Grid } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout, isLoggedIn } } = useStore();
    return (
        <Grid>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img src="/assets/devices.png" alt='logo' style={{ marginRight: '10px' }} />
                        Magazyn
                    </Menu.Item>
                    {isLoggedIn &&
                        <>
                            <Menu.Item as={NavLink} to='/Products' name='Lista Urządzeń' />
                            <Menu.Item as={NavLink} to='/Documents' name='Lista Dokumentów' />
                            <Menu.Item>
                                <Button as={NavLink} to={'/Documents/PZ'} positive content='Przyjęcie' />
                            </Menu.Item>
                            <Menu.Item>
                                <Button as={NavLink} to={`/Documents/WZ`} negative content='Wydanie' />
                            </Menu.Item>
                            {/* <Menu.Item>
                            <Button as={NavLink} to='/errors' negative content='Errors' />
                        </Menu.Item> */}
                            <Menu.Item position='right'>
                                <Image src={user?.image || 'assets/user.png'} avatar spaced='right' />
                                <Dropdown pointing='top left' text={user?.displayName} >
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='Mój Profil' icon='user' />
                                        <Dropdown.Item onClick={logout} text='Wyloguj' icon='power' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        </>
                    }
                </Container>
            </Menu>
        </Grid>

    )
})