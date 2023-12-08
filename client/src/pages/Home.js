import React from 'react';
import { Footer } from '../components/Footer';
import { Container, Row, Col } from "react-bootstrap";
import FavoriteComponent from "../components/FavoriteComponent";
import { SearchBarComponent } from '../components/SearchBarComponent';
import GetStartedGrid from '../components/GetStartedGrid';
import { Navbar } from '../components/Navbar';
import { useSignIn } from '../hooks/useSignIn';

export const Home = () => {
    const loggedIn = useSignIn()

    return (
        <>
            <Navbar />
            <Container
                fluid
                style={{ backgroundColor: "dark", maxWidth: "100%", maxHeight: "100%" }}
            >
                {/* Search Bar */}
                <Row className="mb-4 justify-content-center">
                    <Col md={6}>
                        <SearchBarComponent />
                    </Col>
                </Row>
                {loggedIn && <><FavoriteComponent />
                <Row className="mt-4 mb-4 d-flex justify-content-center">
                    <Col md={10}>
                        <div style={{ borderBottom: "1px solid white" }}></div>
                    </Col>
                </Row>

                <div className="text-center text-white fs-2">
                    <span className="fw-bold">What is the Tech Internship Guide?</span><br />
                    <p className='text-light fs-5'>It's an open source project that organizes websites and other<br />
                        resources needed for you to land a tech internship</p>
                </div></>}

                <Row className="mb-4 justify-content-center">
                    <Col className="text-white mt-4">
                        <div>
                            <GetStartedGrid />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};
