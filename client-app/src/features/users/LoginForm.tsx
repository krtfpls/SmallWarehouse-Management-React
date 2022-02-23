import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Header, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import modalStore from "../../app/stores/modalStore";
import { useStore } from "../../app/stores/store";
import ForgotPassword from "./ForgotPassword";

export default observer( function LoginForm(){
    const {userStore, modalStore} = useStore();

   return (
       <Formik
       initialValues={{email: '', password: '', error: null}}
       onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error: error.response.data}))}
       >
           {({handleSubmit, isSubmitting, errors}) => (
               <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                   <Header as='h2' content='Logowanie do Magazynu' color="brown" textAlign="center"/>
                    <MyTextInput name="email" placeholder="Email"/>
                    <MyTextInput name="password" placeholder="Password" type='password'/>
                    <ErrorMessage
                        name='error' render={() => 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>
                        }
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid/>
                    <Divider horizontal style={{marginTop: '50px'}}>
                    <Button onClick={() => modalStore.openModal(<ForgotPassword />, 'mini' )} size='mini'>
                        Przypomnij hasło
                    </Button>
                    </Divider>
                    
               </Form>
           )}
       </Formik>

   )
})