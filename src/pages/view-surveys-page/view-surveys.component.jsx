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

const ViewSurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    let localSurveys = localStorage.surveys;
    let localAccount = localStorage.account;

    if (localSurveys !== undefined) {
      setSurveys(JSON.parse(localSurveys));
    } else {
      localStorage.setItem("surveys", JSON.stringify(surveyObj));
      setSurveys(surveyObj);
    }

    if (localAccount === undefined) {
      localStorage.setItem("account", JSON.stringify(userObj));
    }
  }, []);
  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol className="mt-2 px-1">
          <MDBCard className="align-items-center" style={{ width: "100%" }}>
            <Header />
            <MDBTypography className="mt-2 mb-4" tag="h4" variant="display-4">
              My Surveys
            </MDBTypography>
            {surveys.length &&
              surveys.map((x, index) => (
                <>
                  <MDBCard className="mb-2" style={{ width: "95%" }}>
                    <MDBCardTitle className="mt-1">{x.name}</MDBCardTitle>
                    <MDBCardBody className="p-1 mb-1">
                      <Link
                        to={`/view-survey?id=${x.id}`}
                        key={`view_${index}`}
                      >
                        <MDBBtn floating className="primaryButton m-1">
                          <MDBIcon icon="eye" size="lg" />
                        </MDBBtn>
                      </Link>
                      <Link
                        to={`/add-or-edit-survey?id=${x.id}`}
                        key={`edit_${index}`}
                      >
                        <MDBBtn
                          floating
                          className="secondaryButton m-1"
                          style={{
                            paddingLeft: "3px",
                          }}
                        >
                          <MDBIcon icon="edit" size="lg" />
                        </MDBBtn>
                      </Link>
                      <MDBBtn floating className="tertiaryButton m-1">
                        <MDBIcon far icon="trash-alt" size="lg" />
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </>
              ))}
            <Link to="/add-or-edit-survey">
              <MDBBtn className="quaternaryButton mx-1 my-3">
                <MDBIcon className="mx-1" icon="plus" size="sm" />
                Add Survey
              </MDBBtn>
            </Link>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ViewSurveys;
