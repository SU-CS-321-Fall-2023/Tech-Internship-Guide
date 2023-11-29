import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

export const ResumeStep1 = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    skills: "",
    objective: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    skills: "",
    objective: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isValid = () => {
    // Validate required fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    setValidationErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const getData = () => {
    return { ...formData, skills: formData.skills.split(",") };
  };

  // Expose the functions to the parent component through the ref
  useImperativeHandle(ref, () => ({
    isValid,
    getData,
  }));

  return (
    <Form>
      <Form.Group className="mb-3" controlId="personal">
        <Row>
          <Col>
            <Form.Control
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full name"
              isInvalid={!!validationErrors.fullname}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fullname}
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              isInvalid={!!validationErrors.mobile}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.mobile}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Control
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          isInvalid={!!validationErrors.address}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="skills">
        <Form.Control
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills"
          isInvalid={!!validationErrors.skills}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.skills}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="objective">
        <Form.Control
          as="textarea"
          rows={3}
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          placeholder="Objective"
          isInvalid={!!validationErrors.objective}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.objective}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
});
