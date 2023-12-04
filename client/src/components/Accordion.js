import React from "react";
import { Accordion as Accord } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

const AccordionItem = (props) => {
    const { eventKey, question, answer } = props;
    return(
        <Accord.Item eventKey={eventKey} className="text-dark">
            <Accord.Header>{question}</Accord.Header>
            <Accord.Body>{answer}</Accord.Body>
        </Accord.Item>
    );
};

export const Accordion = () => {
    const {data} = useFetch("faqs");
    
    return(
        <Accord className="mb-3" style={{width: '70vw'}}>
            {data.map((item, index) => (
                <AccordionItem eventKey={index} key={index} question={item?.question} answer={item?.answer}/>
            ))}
        </Accord>
    );
};