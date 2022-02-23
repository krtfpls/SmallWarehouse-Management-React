import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ICategoryItems } from '../models/CategoryItems';
import { IContractor } from '../models/Contractor';
import { IDocuments } from '../models/Documents';
import { PaginatedResult } from '../models/pagination';
import { IProducts } from '../models/Products';
import { Profile } from '../models/profile';
import { EmailValues, RegisterValues, User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data= new PaginatedResult(response.data, JSON.parse(pagination));
            return response as AxiosResponse<PaginatedResult<any>>
        }
            return response;
}, (error: AxiosError) => {
    const {data, status, config, headers}= error.response!;
    switch (status) {
        case 400:
            if (typeof data=== 'string'){
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if (data.errors){
                const modalStateErrors= [];
                for (const key in data.errors) {
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            if (status === 401  && headers['www-authenticate']?.startsWith('Bearer error="invalid_token')){
                store.userStore.logout();
                toast.error('Session expired - please login again');
            }
            break;
        case 404:
            history.push('/not-fount');
            toast.error('not found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
           break; 
    }
    return Promise.reject(error);
})

const responseBody= <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get:<T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Products= {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<IProducts[]>>('/Products', {params})
            .then(responseBody),
    details: (id: string) => requests.get<IProducts>(`/Products/${id}`),
    create: (item: IProducts) => requests.post<void>(`/Products`, item),
    update: (item: IProducts) => requests.put<void>(`/Products/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/Products/${id}`)
}

const CategoryItems= {
    list: () => requests.get<ICategoryItems[]>('/CategoryProducts'),
    details: (id: string) => requests.get<ICategoryItems>(`/CategoryProducts/${id}`),
    create: (item: ICategoryItems) => requests.post<void>(`/CategoryProducts`, item),
    update: (item: ICategoryItems) => requests.put<void>(`/CategoryProducts/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/CategoryProducts/${id}`)
}

const Documents = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<IDocuments[]>>('/Documents', {params})
        .then(responseBody),
    details: (id: string) => requests.get<IDocuments>(`/documents/${id}`),
    createInDoc: (item: IDocuments) => requests.post<void>(`/documents/in`, item),
    createOutDoc: (item: IDocuments) => requests.post<void>(`/documents/out`, item),
    update: (item: IDocuments) => requests.put<void>(`/documents/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/documents/${id}`)
}

const Contractors = {
    list: () => requests.get<IContractor[]>('/Contractors'),
    details: (id: string) => requests.get<IContractor>(`/Contractors/${id}`),
    create: (item: IContractor) => requests.post<void>(`/Contractors`, item),
    update: (item: IContractor) => requests.put<void>(`/Contractors/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/Contractors/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    refreshToken: () => requests.post<User>('account/refreshToken', {}),
    verifyEmail: (values: EmailValues) => 
        requests.post<void>(`/account/verifyEmail`, values),
    resendEmailConfirm: (values: EmailValues) =>
        requests.post(`/account/resendEmailConfirmationLink`, values) ,
    forgotPassword: (values: EmailValues) => 
        requests.post(`/account/ForgotPassword`, values) ,
    resetPassword: (values: RegisterValues) =>
        requests.post(`/account/ResetPassword`, values) ,
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/Profiles/${username}`)
}

const agentAxios = {
    Products,
    CategoryItems,
    Documents,
    Contractors,
    Account,
    Profiles
}

export default agentAxios;