import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const CommentPostBox = (props) => {
  console.log(props, "comment post box props");
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [postText, setPostText] = useState("");


  const handleButtonClick = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 500);

    try {
      let url;
      console.log(props?.title, "props?.title");

      if (props?.title === "Post") {
        url = 'http://localhost:4000/post';
      } else if (props?.title === "Reply" && props?.postId) {
        console.log(props?.postId, "props?.postId", "Reply Hello" );
        url = `http://localhost:4000/post/${props?.postId}/replies`;
      }

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: postText
        }),
      });

      const data = await response.json();
      if (props?.title === "Post") {
      props.updatePosts();
      }
      setPostText("");
      console.log(data);
    } catch (error) {
      console.error("This is the error");
      console.error(error);
    }
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
                onChange={(event) => setPostText(event.target.value)}
                value={postText}
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

export default CommentPostBox;
