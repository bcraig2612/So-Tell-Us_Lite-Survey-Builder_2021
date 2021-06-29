import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header/header.component";

import {
  MDBIcon,
  MDBBtn,
  MDBRow,
  MDBInput,
  MDBContainer,
  MDBCheckbox,
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

  submittedSurveys.map(function(x, i) {
    x.elements.map(function(x, i) {
      if(x.type === "checkbox") {
        const result = x.answer.map(({ choice }) => choice);
        const objMap={};

        result.forEach((e1)=>x.choices.forEach((e2)=> {if(e1 === e2){
          objMap[e1]=objMap[e1]+1||1;
        }}));

        let answerArr = Object.keys(objMap).map(e=>String(e));
        console.log(answerArr);
      }
    });
  });

  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol className="mt-2 px-1">
          <MDBCard className="align-items-center mb-2" style={{ width: "100%" }}>
            <Header />
            <MDBTypography className="mt-2 mb-4" tag="h4" variant="display-4">
              Submitted Surveys
            </MDBTypography>
            {submittedSurveys.length && submittedSurveys.map((x, index) => (
              <>
                <MDBCard className="mb-4" style={{ width: "95%" }}>
                  <MDBCardTitle className="mt-1">{x.name}</MDBCardTitle>
                  <MDBCardBody className="p-1 mb-1">
                    {x.elements.map((x, index) => (
                      <>
                        <div className="mb-3">
                          {x.name ? (
                            <div className="form-text mb-1">{x.name}</div>
                          ) : null}
                        {x.type === "text" ? (
                          <div className="mb-4">
                            <MDBInput
                              type="text"
                              value={x.answer}
                              disabled
                            />
                          </div>
                        ) : x.type === "checkbox" ? (
                          <div
                            className="mb-4"
                            style={{ textAlign: "initial" }}
                          >
                            <Checkbox
                              choices={x.choices}
                              idx={index}
                            />
                          </div>
                        ) : x.type === "dropdown" ? (
                          <div
                            className="mb-4"
                            style={{ textAlign: "initial" }}
                          >
                            <Dropdown
                              choices={x.choices}
                              idx={index}
                            />
                          </div>
                        ) : null}
                        </div>
                      </>
                    ))}
                  </MDBCardBody>
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

const Checkbox = ({ choices }) => {
  return (
    <>
      {choices.map((ch, index) => (
        <MDBCheckbox
          name="flexCheck"
          type="checkbox"
          value={ch}
          label={ch}
          key={index}
          disabled
        />
      ))}
    </>
  );
};

const Dropdown = ({ choices }) => {
  return (
    <>
      <select disabled>
        <option value=""></option>
        {choices.map((ch, index) => (
          <option value={ch} key={index}>
            {ch}
          </option>
        ))}
      </select>
    </>
  );
};

export default SubmittedSurveys;
