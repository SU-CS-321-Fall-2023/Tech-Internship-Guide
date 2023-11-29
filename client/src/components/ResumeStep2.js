import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

export const ResumeStep2 = forwardRef((props, ref) => {
  const [qualifications, setQualifications] = useState([
    { college: "", course: "", percentage: "", year: "" },
  ]);
  const [validationErrors, setValidationErrors] = useState([]);

  const addQualification = () => {
    setQualifications((prevQualifications) => [
      ...prevQualifications,
      { college: "", course: "", percentage: "", year: "" },
    ]);
  };

  const removeQualification = (index) => {
    setQualifications((prevQualifications) =>
      prevQualifications.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setQualifications((prevQualifications) => {
      const updatedQualifications = [...prevQualifications];
      updatedQualifications[index][name] = value;
      return updatedQualifications;
    });
  };

  const validate = () => {
    const errors = qualifications.map((qualification) =>
      Object.values(qualification).some((field) => field.trim() === "")
    );
    setValidationErrors(errors);
    return !errors.includes(true);
  };

  const isValid = () => {
    console.log(props.title + " clicked");
    return validate();
  };

  const getData = () => {
    const data = qualifications.map((qualification, index) => ({
      college: qualification.college,
      course: qualification.course,
      percentage: qualification.percentage,
      year: qualification.year,
    }));

    return {
      qualifications: data,
    };
  };

  // Expose the functions to the parent component through the ref
  useImperativeHandle(ref, () => ({
    isValid,
    getData,
  }));

  return (
    <Form>
      {qualifications.map((qualification, index) => (
        <div key={index}>
          <Form.Group className="mb-3" controlId={`college${index + 1}`}>
            <Row>
              <Col sm={5}>
                <Form.Control
                  name="college"
                  value={qualification.college}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="College name"
                />
              </Col>

              <Col sm={5}>
                <Form.Control
                  name="course"
                  value={qualification.course}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Course"
                />
              </Col>
              <Col sm={2}>
                {index > 0 && (
                  <Button
                    variant="danger"
                    onClick={() => removeQualification(index)}
                    className="ms-2"
                  >
                    Remove
                  </Button>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId={`marks${index + 1}`}>
            <Row>
              <Col sm={5}>
                <Form.Control
                  name="percentage"
                  type="number"
                  value={qualification.percentage}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Percentage"
                />
              </Col>

              <Col sm={5}>
                <Form.Control
                  name="year"
                  type="number"
                  value={qualification.year}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Year of completion"
                />
              </Col>
            </Row>
          </Form.Group>
          {validationErrors[index] && (
            <div className="text-danger">All fields are required</div>
          )}
          <hr />
        </div>
      ))}

      <Button variant="primary" onClick={addQualification}>
        Add Qualification
      </Button>
    </Form>
  );
});
