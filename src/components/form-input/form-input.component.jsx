import React from "react";

import { MDBInput, MDBRow } from "mdb-react-ui-kit";

const FormInput = ({ handleChange, label, ...props }) => (
  <MDBRow className="d-flex justify-content-center">
    {label ? <div className="form-text mb-1">Your {label}</div> : null}
    <MDBInput wrapperClass="col-10 mb-2" {...props} />
  </MDBRow>
);

export default FormInput;
