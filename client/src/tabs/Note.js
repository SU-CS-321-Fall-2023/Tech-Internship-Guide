import React from "react";
import { Block } from "../components/Block";
import { Container } from "react-bootstrap";
import { BLOCK_SECTIONS } from "../core/block-cores";
import ForumComponent from "../components/ForumComponent";

export const Note = () => {
    return(
        <Container className="mb-3">
            <div style={{display: 'flex', overflowX: 'auto'}}>
                {BLOCK_SECTIONS?.note.map((item, index) => (
                    <div className="me-5">
                        <Block blockId={item} key={index} blockWidth={'45rem'} blockHeight={'30rem'}/>
                    </div>
                ))}
            </div>
            <ForumComponent />
       
        </Container>
       
    );
};
