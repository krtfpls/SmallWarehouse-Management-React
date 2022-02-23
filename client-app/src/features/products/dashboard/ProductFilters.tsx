import { observer } from "mobx-react-lite";
import React, {  useEffect } from "react";
import { Button, Divider, Dropdown, DropdownProps, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductFilters() {
    const { categoryItemStore: { loadCategoryItems, getCategoryOptions, loadingCategory,
        CategoryItems }, ProductStore: { predicate, setPredicate } } = useStore();

    useEffect(() => {
        loadCategoryItems();
    }, [loadCategoryItems]);

    function selectCategory(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) {
        const {  value } = data;
        const category = CategoryItems.find(x => x.name === value);
        setPredicate('categoryName', category!.name);
    }


    return (
        <>  
        <Segment style={{ marginTop: '50px' }}> 
        <Dropdown
                button
                floating
                icon='filter'
                placeholder="Filtruj po kategorii"
                options={getCategoryOptions}
                loading={loadingCategory}
                onChange={selectCategory}
                className='icon'
                search
               value={predicate.get('categoryName')}
                fluid
                labeled
            />
            <Divider horizontal>
                <Button
                    circular
                    size="mini"
                    color="grey"
                    content="reset"
                    onClick={() => setPredicate('all', 'true')} />
            </Divider>
            </Segment>
        </>
    )
})

