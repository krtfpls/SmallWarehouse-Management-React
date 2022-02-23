import React from 'react';
import NavBar from './Nav/NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router';
import HomePage from '../../features/home/HomePage';
import DocumentsDashboard from '../../features/documents/dashboards/DocumentsDashboard';
import DocumentForm from '../../features/documents/form/DocumentForm';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/modalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import ProductsDashboard from '../../features/products/dashboard/ProductsDashboard';
import ProductsDetails from '../../features/products/details/ProductsDetails';
import ProductsEdit from '../../features/products/details/ProductsEdit';
import PrivateRoute from './PrivateRoute';
import RegisterSuccess from '../../features/users/RegisterSuccess';
import ConfirmEmail from '../../features/users/ConfirmEmail';
import PasswordSuccess from '../../features/users/PasswordSuccess';
import ResetPassword from '../../features/users/ResetPassword';

function App() {

  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Momencik...' />

  return (
    <>

      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <NavBar />

      <Routes>
        <Route
          path='/'>
            <Route path='/' element={<HomePage />}/>
            <Route path='/Products' element={<PrivateRoute component={ProductsDashboard} />} />
            <Route path='/Products/:id' element={<PrivateRoute component={ProductsDetails} />} />
            <Route path='/manage/:id' element={<PrivateRoute component={ProductsEdit} />} />
            <Route path='/Documents' element={<PrivateRoute component={DocumentsDashboard} />} />
            <Route path={'/Documents/:type'} element={<PrivateRoute component={DocumentForm} />} />
            <Route path={'/Documents/:type/:id'} element={<PrivateRoute component={DocumentForm} />} />
            <Route path='/profiles/:username' element={<PrivateRoute component={ProfilePage} />} />
            <Route path='/errors' element={<PrivateRoute component={TestErrors} />} />
            <Route path='/server-error' element={<ServerError />} />
            <Route path='/account/registerSuccess' element={<RegisterSuccess />} />
            <Route path='/account/ResetPassword' element={<ResetPassword />} />
            <Route path='/account/PasswordSuccess' element={<PasswordSuccess />} />
            <Route path='/account/verifyEmail' element={<ConfirmEmail />} />
            <Route path="*" element={<PrivateRoute component={NotFound} />} />
        </Route>
      </Routes>

    </>
  );
}



export default observer(App);
