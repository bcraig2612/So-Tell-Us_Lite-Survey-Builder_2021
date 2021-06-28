import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header/header.component";

import { surveyObj } from "../../utils/survey.data";
import { userObj } from "../../utils/user.data";

import {
  MDBIcon,
  MDBBtn,
  MDBRow,
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTypography,
} from "mdb-react-ui-kit";

const SubmittedSurveys = () => {
  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol className="mt-2 px-1">
          <MDBCard className="align-items-center" style={{ width: "100%" }}>
            <Header />
            <MDBTypography className="mt-2 mb-4" tag="h4" variant="display-4">
              Submitted Surveys
            </MDBTypography>
            <MDBCard className="mb-2" style={{ width: "95%" }}>
              Hello World
            </MDBCard>
          </MDBCard>
          <Link to="/view-surveys">
            <MDBBtn id="secondaryButton" className="m-2">
              <MDBIcon icon="undo" size="sm" style={{ marginRight: "6px" }} />
              View Surveys
            </MDBBtn>
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SubmittedSurveys;
