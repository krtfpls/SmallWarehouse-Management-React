import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Container, Header, Icon, IconGroup, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";
import useQuery from "../../app/common/util/hooks";
import { EmailValues } from "../../app/models/user";

export default observer(function PasswordReset() {
    const { userStore } = useStore();

    const postValues: EmailValues = {
        email: useQuery().get('email') as string,
        token: useQuery().get('token') as string
    }

    const Status = {
        Pending: 'Pending',
        Failed: 'Failed',
        Success: 'Success'
    }

    const [status, setStatus] = useState(Status.Pending);



    return (
        <Container style={{ marginTop: "7em" }} >
            <Segment placeholder textAlign="center">
                <Header icon>

                    <Icon name="exclamation" size='mini' />
                    Ustal nowe hasło
                </Header>
                <Formik
                    initialValues={{ password: '', reenterPassword: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.resetPassword(postValues, values.password).catch(error => setErrors({ error }))}

                    validationSchema={Yup.object({
                        password: Yup.string().required().min(8).max(100),
                        reenterPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasła muszą byc takie same')
                    })}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>

                            <MyTextInput name="password" placeholder="Hasło" type='password' />
                            <MyTextInput name="reenterPassword" placeholder="Powtórz hasło" type='password' />
                            <ErrorMessage
                                name='error' render={() =>
                                    <ValidationErrors errors={errors.error} />
                                }
                            />
                            <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Resetuj hasło' type='submit' fluid />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Container>
    )
})