import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

export const ResumeStep3 = forwardRef((props, ref) => {
  const [organizations, setOrganizations] = useState([
    { organization: "", role: "", from: "", to: "" },
  ]);
  const [validationErrors, setValidationErrors] = useState([]);

  const addOrganization = () => {
    setOrganizations((prevOrganizations) => [
      ...prevOrganizations,
      { organization: "", role: "", from: "", to: "" },
    ]);
  };

  const removeOrganization = (index) => {
    setOrganizations((prevOrganizations) =>
      prevOrganizations.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setOrganizations((prevOrganizations) => {
      const updatedOrganizations = [...prevOrganizations];
      updatedOrganizations[index][name] = value;
      return updatedOrganizations;
    });
  };

  const validate = () => {
    const errors = organizations.map((organization) =>
      Object.values(organization).some((field) => field.trim() === "")
    );
    setValidationErrors(errors);
    return !errors.includes(true);
  };

  const isValid = () => {
    console.log(props.title + " clicked");
    return validate();
  };

  const getData = () => {
    const data = organizations.map((organization, index) => ({
      organization: organization.organization,
      from: organization.from,
      to: organization.to,
      role: organization.role,
    }));

    return {
      organizations: data,
    };
  };

  // Expose the functions to the parent component through the ref
  useImperativeHandle(ref, () => ({
    isValid,
    getData,
  }));

  return (
    <Form>
      {organizations.map((organization, index) => (
        <div key={index}>
          <Form.Group className="mb-3" controlId={`org${index + 1}`}>
            <Row>
              <Col sm={5}>
                <Form.Control
                  name="organization"
                  value={organization.organization}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Organization"
                />
              </Col>

              <Col sm={5}>
                <Form.Control
                  name="role"
                  value={organization.role}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Role"
                />
              </Col>
              <Col sm={2}>
                {index > 0 && (
                  <Button
                    variant="danger"
                    onClick={() => removeOrganization(index)}
                    className="ms-2"
                  >
                    Remove
                  </Button>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId={`experience${index + 1}`}>
            <Row>
              <Col sm={5}>
                <Form.Control
                  name="from"
                  value={organization.from}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="From (eg. dd-mm-yyyy)"
                />
              </Col>

              <Col sm={5}>
                <Form.Control
                  name="to"
                  value={organization.to}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="To (eg. dd-mm-yyyy)"
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

      <Button variant="primary" onClick={addOrganization}>
        Add Organization
      </Button>
    </Form>
  );
});
