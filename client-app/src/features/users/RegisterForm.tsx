import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer( function RegisterForm(){
    const {userStore} = useStore();

   return (
       <Formik

       initialValues={{displayName: '', userName: '', email: '', password: '', reenterPassword: '', error: null}}

       onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => setErrors({error}))}
       
       validationSchema={Yup.object({
           displayName: Yup.string().required().max(100),
           userName: Yup.string().required().max(100),
           email: Yup.string().required().email().max(100),
           password: Yup.string().required().min(8).max(100),
           reenterPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasła muszą byc takie same')
       })}
       >
           {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
               <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                   <Header as='h2' content='Rejestracja do Magazynu' color="brown" textAlign="center"/>
                    <MyTextInput name="displayName" placeholder="Wyświetlana Nazwa"/>
                    <MyTextInput name="userName" placeholder="Nazwa Użytkownika"/>
                    <MyTextInput name="email" placeholder="Email"/>
                    <MyTextInput name="password" placeholder="Hasło" type='password'/>
                    <MyTextInput name="reenterPassword" placeholder="Powtórz hasło" type='password'/>
                    <ErrorMessage
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>
                        }
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Zarejestruj' type='submit' fluid/>
               </Form>
           )}
       </Formik>

   )
})