import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

interface Props{
    profile: Profile
}

export default observer( function ProfilePhoto({profile}: Props) {
return(
    <Tab.Pane>
        <Header icon='image' content='Zdjęcie profilowe'/>
        <Card.Group itemsPerRow={5}>
            <Card key={profile.photos?.id}>
                <Image src={profile.photos?.content}/>
            </Card>
        </Card.Group>
    </Tab.Pane>
)
})