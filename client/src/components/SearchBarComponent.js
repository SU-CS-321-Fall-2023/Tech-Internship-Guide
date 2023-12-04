import React from "react";
import { Form } from "react-bootstrap";
import SearchSvg from "./SearchSvgIcon";

export const SearchBarComponent = () => {
  return (
    <div className="d-flex align-items-center">
      <SearchSvg />
      <Form.Control
         type="text"
         size="lg"
         style={{ borderRadius: "15px", marginLeft: "10px", width: "80%", backgroundColor: "#1F1F1F", color: "white" }}/>
    </div>
  );
};
