import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { Accordion, AccordionTitleProps, Header, Icon, Label, List, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import DatePicker from "react-datepicker";

export default observer(function DocumentFilters() {
    const { documentStore: { predicate, setPredicate } } = useStore();
    const [state, setState] = useState(-1);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, titleProps: AccordionTitleProps) => {
        const index = titleProps.index as number;
        const activeIndex = state;
        const newIndex = activeIndex === index ? -1 : index;
        setState(newIndex);
    }

    return (
        <>
            <Segment.Group style={{ marginTop: 25 }}>
                <Segment>
                    <Accordion>
                        <Accordion.Title
                            active={state === 0}
                            index={0}
                            onClick={handleClick}
                            text
                        >
                            <Icon name='dropdown' size="large" color="brown"/>
                            Filtry:
                        </Accordion.Title>
                        <Accordion.Content active={state === 0}>
                            <Segment>
                                <Menu vertical fluid>
                                    <Header icon='filter' size="tiny" attached color='brown' content='wg typu: ' />
                                    <Menu.Item
                                        content='Wszystkie dokumenty'
                                        active={predicate.has('all')}
                                        onClick={() => setPredicate('all', 'true')}
                                    />
                                    <Menu.Item content='Przyjęcia'
                                        active={predicate.has('isIncome')}
                                        onClick={() => setPredicate('PZ', 'true')}
                                    />
                                    <Menu.Item content='Wydania'
                                        active={predicate.has('isIncome')}
                                        onClick={() => setPredicate('WZ', 'false')}
                                    />
                                    <Menu.Item content='Kontrahent'
                                        active={predicate.has('ContractorID')}
                                        onClick={() => setPredicate('ContractorID', 'true')}
                                    />
                                </Menu>
                            </Segment>
                            <Segment >
                                <Segment.Group>
                                    <List divided selection>
                                        <Header content="wg daty" color="brown" icon='filter' size="tiny" attached />
                                        <List.Item>
                                            <Label content="od:" size="tiny" horizontal circular color="grey" />
                                            <DatePicker
                                                selected={predicate.get('FromDate') || new Date()}
                                                onChange={(date: Date) => setPredicate('FromDate', date)}
                                                dateFormat='dd-MM-yyyy'
                                                className={'react-datepicker-wrapper'}
                                                />
                                        </List.Item>
                                        <List.Item>
                                            <Label content="do:" size="tiny" horizontal circular color="grey" />
                                            <DatePicker
                                                selected={predicate.get('ToDate') || new Date()}
                                                onChange={(date: Date) => setPredicate('ToDate', date)}
                                                dateFormat='dd-MM-yyyy'
                                                className={'react-datepicker-wrapper'}
                                            />
                                        </List.Item>
                                    </List>
                                </Segment.Group>
                            </Segment>
                        </Accordion.Content>
                    </Accordion>
                </Segment>
            </Segment.Group>
        </>

    )
})