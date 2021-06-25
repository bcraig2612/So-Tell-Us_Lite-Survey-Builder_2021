import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Header from "../../components/header/header.component";

import {
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBCheckbox,
  MDBCardTitle,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const ViewSurvey = () => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    let localSurveys = localStorage.surveys;

    localSurveys = JSON.parse(localSurveys);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("id");
    localSurveys.map((s) => {
      if (s.id === id) {
        setSurvey(s);
      }
    });
  }, []);

  return (
    <>
      {survey && (
        <MDBContainer>
          <MDBRow center>
            <MDBCol className="mt-2 px-1">
              <MDBCard
                className="align-items-center mt-2"
                style={{
                  width: "100%",
                  border: "1px solid rgba(0,0,0,.125)",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
                }}
              >
              <Header/>
                <MDBTypography
                  className="mt-2 mb-4"
                  tag="h4"
                  variant="display-4"
                >
                  View Survey
                </MDBTypography>
                <MDBCard
                  className="mb-2"
                  style={{ width: "95%", padding: "7px", border: "1px solid rgba(0,0,0,.125)" }}
                >
                  <MDBCardTitle className="mt-1">{survey.name}</MDBCardTitle>
                  <MDBCardBody className="p-1">
                    {survey.elements.map((el, index) => (
                      <div className="mb-3" key={index}>
                        {el.name ? (
                          <div className="form-text mb-1">{el.name}</div>
                        ) : null}
                        {el.type === "text" ? (
                          <MDBInput type="text" />
                        ) : el.type === "checkbox" ? (
                          <div style={{ textAlign: "initial" }}>
                          <Checkbox choices={el.choices} />
                          </div>
                        ) : el.type === "dropdown" ? (
                          <Dropdown choices={el.choices} />
                        ) : null}
                      </div>
                    ))}
                  </MDBCardBody>
                  <MDBCardFooter className="mt-2">
                    <Link to="/view-surveys">
                      <MDBBtn style={{ backgroundColor: "#78909C" }}>
                        <MDBIcon
                          icon="undo"
                          size="sm"
                          style={{ marginRight: "6px" }}
                        />
                        View Surveys
                      </MDBBtn>
                    </Link>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
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
          />
      ))}
    </>
  );
};

const Dropdown = ({ choices }) => {
  return (
    <>
      <select>
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

export default ViewSurvey;
