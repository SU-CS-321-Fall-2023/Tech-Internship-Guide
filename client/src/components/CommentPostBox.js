import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const PostTextBox = (props) => {
  const [isButtonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 500);
  };

  return (
    <div>
      <Form>
        <Row className={props.styling}>
          <Col
            xs={12}
            sm={10}
            md={10}
            lg={8}
            xl={8}
            className="position-relative"
            style={{ maxWidth: "850px" }}
          >
            <Form.Group controlId="postControlId">
              <Form.Control
                type="text"
                placeholder={props.placeholder}
                className="text-center rounded-pill"
                style={{
                  height: "60px",
                  paddingRight: "40px",
                  backgroundColor: "grey",
                  color: "white",
                  boxShadow: "none",
                }}
              />
              <div
                className="position-absolute d-flex align-items-center justify-content-center"
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "70px",
                  backgroundColor: "#e9ecef",
                  color: "#495057",
                  borderTopRightRadius: "1.375rem",
                  borderBottomRightRadius: "1.375rem",
                  borderStartEndRadius: "1.25rem",
                  cursor: "pointer",
                  transform: isButtonClicked ? "translateX(5px)" : "translateY(0)",
                  transition: "transform 0.2s ease-in-out",
                }}
                onClick={handleButtonClick}
              >
                {props.title}
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PostTextBox;
