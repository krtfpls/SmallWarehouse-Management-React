import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhoto from "./ProfilePhoto";

interface Props{
    profile: Profile
}

export default observer(function ProfileContent({profile}: Props) {
    const panes = [
        {menuItem: 'O Mnie', render: () => <Tab.Pane>O Mnie</Tab.Pane>},
        {menuItem: 'Zdjęcie', render: () => <ProfilePhoto profile={profile}/>}
    ]

    return(
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition="right"
            panes={panes}
        />
    )
})