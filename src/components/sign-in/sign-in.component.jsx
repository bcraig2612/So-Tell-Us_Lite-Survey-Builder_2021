import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormInput from "../form-input/form-input.component";

import {
  MDBBtn,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "test123@gmail.com",
    password: "KeepItSecret",
  });

  const handleChange = (e) => {
    setLoginData({ [e.target.name]: e.target.value });
  };

  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol className="mt-2 px-1">
          <MDBCard style={{ width: "100%", height: "95vh", border: "1px solid rgba(0,0,0,.125)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)" }}>
            <MDBCardTitle>
              <MDBTypography className="mt-2" variant="display-4">
                Lite Survey Builder
              </MDBTypography>
            </MDBCardTitle>
            <MDBCardBody>
              <form>
                <FormInput
                  name="email"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  value={loginData.email}
                  label="email"
                  required
                />
                <FormInput
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => handleChange(e)}
                  label="password"
                  required
                />
                <div>
                  <Link to="/view-surveys">
                    <MDBBtn type="submit" style={{ width: "50%" }}>Sign in</MDBBtn>
                  </Link>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignIn;
