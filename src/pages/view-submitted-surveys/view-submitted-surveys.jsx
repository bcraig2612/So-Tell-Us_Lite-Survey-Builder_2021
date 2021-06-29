import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header/header.component";

import {
  MDBIcon,
  MDBBtn,
  MDBRow,
  MDBContainer,
  MDBBadge,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTypography,
} from "mdb-react-ui-kit";

const SubmittedSurveys = () => {
  const [submittedSurveys, setSubmittedSurveys] = useState([]);

  useEffect(() => {
    let localAnsweredSurveys = localStorage.answeredSurveys;

    if (localAnsweredSurveys !== undefined) {
      setSubmittedSurveys(JSON.parse(localAnsweredSurveys));
    }

  }, []);

  console.log(submittedSurveys);

  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol className="mt-2 px-1">
          <MDBCard className="align-items-center mb-2" style={{ width: "100%" }}>
            <Header />
            <MDBTypography className="mt-2 mb-4" tag="h4" variant="display-4">
              Submitted Surveys
              <p className="mb-0" style={{ fontSize: "12px" }}><MDBIcon className="primaryIcon ms-1" icon="comment" size="sm" />&nbsp;-&nbsp;Text&nbsp;&nbsp;<MDBIcon className="primaryIcon ms-1" icon="check-circle" size="sm" />&nbsp;-&nbsp;Checkbox&nbsp;&nbsp;<MDBIcon className="primaryIcon ms-1" icon="hand-pointer" size="sm" />&nbsp;-&nbsp;Dropdown</p>
            </MDBTypography>
            {submittedSurveys.length && submittedSurveys.map((x, index) => (
              <>
                <MDBCard className="submittedSurvey align-items-center mb-4" style={{ width: "95%" }}>
                  <MDBCardTitle className="mt-1">{x.name}</MDBCardTitle>
                    {x.elements.map((x, index) => (
                      <>
                      <MDBCard className="mb-3" style={{ width: "95%" }}>
                        <MDBCardBody className="p-1 mb-1">
                        <div>
                            {x.name && x.type === "text" ? (
                              <div className="form-text mb-1"><MDBIcon className="primaryIcon ms-1" icon="comment" size="sm" />&nbsp;{x.name}</div>
                              ) : x.name && x.type === "checkbox" ? (
                                <div className="form-text mb-1"><MDBIcon className="primaryIcon ms-1" icon="check-circle" size="sm" />&nbsp;{x.name}</div>
                                ) : x.name && x.type === "dropdown" ? (
                                  <div className="form-text mb-1"><MDBIcon className="primaryIcon ms-1" icon="hand-pointer" size="sm" />&nbsp;{x.name}</div>
                                  ) : null}
                        {x.type === "text" ? (
                          <div className="mb-1">
                            {x.answer}
                          </div>
                        ) : x.type === "checkbox" ? (
                          <div className="mb-1">
                            {x.answer.map(({ choice }) => <p className="mb-1">{choice}</p>)}
                          </div>
                        ) : x.type === "dropdown" ? (
                          <div className="mb-1">
                            <p className="mb-1">{x.answer}</p>
                          </div>
                        ) : null}
                        </div>
                        </MDBCardBody>
                        </MDBCard>
                      </>
                    ))}
                </MDBCard>
              </>
            ))}
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
