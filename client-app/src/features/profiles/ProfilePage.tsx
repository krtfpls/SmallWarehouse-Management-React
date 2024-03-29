import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage(){
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile} = profileStore;

    useEffect(() => {
        loadProfile(username!)
    }, [loadProfile, username])

    if (loadingProfile) return <LoadingComponent content="Ładuje profil..."/>

    return (
        <Container style={{ marginTop: "7em" }} >
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                <>
                <ProfileHeader profile={profile}/>
                <ProfileContent profile={profile!}/>
                </>}
            </Grid.Column>
        </Grid>
        </Container>
    )
})