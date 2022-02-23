import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function ForgotPassword() {
    const {userStore} = useStore();

    return (
        <Formik
 
        initialValues={{email: '', error: null}}
 
        onSubmit={(values, {setErrors}) => userStore.forgotPassword(values.email).catch(error => setErrors({error}))}
        
        validationSchema={ Yup.object({
            email: Yup.string().required().email().max(100),
        })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Resetowanie hasła' color="brown" textAlign="center"/>
                     <MyTextInput name="email" placeholder="Email"/>
                     <ErrorMessage
                         name='error' render={() => 
                         <ValidationErrors errors={errors.error}/>
                         }
                     />
                     <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Resetuj hasło' type='submit' fluid/>
                </Form>
            )}
        </Formik>
 
    )
 })