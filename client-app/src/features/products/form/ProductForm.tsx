import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';

export default observer(function ProductForm() {

    const { categoryItemStore } = useStore();
    const { getCategoryOptions } = categoryItemStore;

    useEffect(() => {

        categoryItemStore.loadCategoryItems();

    }, [categoryItemStore]);

    return (
        <>
            <MyTextInput name='name' placeholder='Nazwa' label='Nazwa'/>
            <MySelectInput options={getCategoryOptions} label="Kategoria" name='category' placeholder='Kategoria' />
            <MyTextInput placeholder='Numer Seryjny' label='Numer Seryjny' name="serialNumber" />
            <MyTextInput placeholder='' label='Ilość' name="quantity" />
            <MyTextInput placeholder='' label='Cena netto' name="priceNetto" />
            <MyTextInput placeholder='' label='Zapas minimalny' name="minLimit" />
            <MyTextArea placeholder='Opis' label='Opis' name="description" rows={3} />
        </>
    );
})

