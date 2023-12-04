import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import GetStartedCardComponent from "./GetStartedCardComponent";
import getStartedData from "../core/GetStartedMockData";

const GetStartedGrid = () => {
  return (
    <Container fluid>
      <Row>
        {getStartedData.map((item, index) => (
          <Col key={index} md={3} lg={3} xl={4} className="mb-4">
            {/* Use md={4} instead of md={3} to see if it helps */}
            <GetStartedCardComponent props={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GetStartedGrid;
