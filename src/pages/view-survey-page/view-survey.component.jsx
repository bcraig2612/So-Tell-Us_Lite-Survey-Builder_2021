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

import { useHistory } from "react-router-dom";

const ViewSurvey = () => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState(null);

  const history = useHistory();

  useEffect(() => {
    let localSurveys = localStorage.surveys;

    localSurveys = JSON.parse(localSurveys);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("id");
    localSurveys.map((s) => {
      if (s.id === id) {
        setSurvey(s);
        setAnswers(s);
      }
    });
  }, []);
  console.log(survey);

  const handleAnswerInput = (e, index) => {
    console.log(e, index);
    let stateCopy = answers;

    stateCopy.elements[index].answer = e;

    setAnswers({ ...stateCopy });
  };

  const handleCheckboxChange = (e, index, chIndex) => {
    let stateCopy = answers;

    if (
      stateCopy.elements[index].answer &&
      stateCopy.elements[index].answer.length
    ) {
      let usedIndexes = [];
      stateCopy.elements[index].answer.map((x) => {
        usedIndexes.push(x.index);
      });
      if (usedIndexes.includes(chIndex)) {
        stateCopy.elements[index].answer = stateCopy.elements[
          index
        ].answer.filter((x) => x.index !== chIndex);
      } else {
        stateCopy.elements[index].answer.push({ choice: e, index: chIndex });
      }
    } else {
      stateCopy.elements[index].answer = [{ choice: e, index: chIndex }];
    }

    setAnswers({ ...stateCopy });
  };

  const isFormValid = () => {
    let incomplete = 0;
    answers.elements.map((x) => {
      if (!x.answer || !x.answer.length) {
        incomplete++;
      }
    });
    if (incomplete > 0) {
      return true;
    } else {
      return false;
    }
  };

  const submitAnsweredSurvey = () => {
    let localAnsweredSurveys = localStorage.answeredSurveys;

    if (localAnsweredSurveys === undefined) {
      let surveyObj = [];
      surveyObj.push(answers)
      localStorage.setItem("answeredSurveys", JSON.stringify(surveyObj));
    } else {
      let surveyObj = JSON.parse(localAnsweredSurveys);
      surveyObj.push(answers);
      localStorage.setItem("answeredSurveys", JSON.stringify(surveyObj));
    }

    history.push("/view-submitted-surveys");
  };
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
                <Header />
                <MDBTypography
                  className="mt-2 mb-4"
                  tag="h4"
                  variant="display-4"
                >
                  View Survey
                </MDBTypography>
                <MDBCard
                  className="mb-2"
                  style={{
                    width: "95%",
                    padding: "7px",
                    border: "1px solid rgba(0,0,0,.125)",
                  }}
                >
                  <MDBCardTitle className="mt-1">{survey.name}</MDBCardTitle>
                  <MDBCardBody className="p-1">
                    {survey.elements.map((el, index) => (
                      <div className="mb-3" key={index}>
                        {el.name ? (
                          <div className="form-text mb-1">{el.name}</div>
                        ) : null}
                        {el.type === "text" ? (
                          <div className="mb-4">
                            <MDBInput
                              type="text"
                              onChange={(e) =>
                                handleAnswerInput(e.target.value, index)
                              }
                            />
                          </div>
                        ) : el.type === "checkbox" ? (
                          <div
                            className="mb-4"
                            style={{ textAlign: "initial" }}
                          >
                            <Checkbox
                              choices={el.choices}
                              idx={index}
                              handleChange={handleCheckboxChange}
                            />
                          </div>
                        ) : el.type === "dropdown" ? (
                          <div
                            className="mb-4"
                            style={{ textAlign: "initial" }}
                          >
                            <Dropdown
                              choices={el.choices}
                              idx={index}
                              handleChange={handleAnswerInput}
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </MDBCardBody>
                  <MDBCardFooter className="mt-2 px-1">
                    <MDBBtn
                      className="primaryButton"
                      type="submit"
                      disabled={isFormValid()}
                      onClick={() => submitAnsweredSurvey()}
                    >
                      <MDBIcon
                        icon="check-double"
                        size="sm"
                        style={{ marginRight: "6px" }}
                      ></MDBIcon>
                      <span className="form-text text-white">
                        Submit Survey
                      </span>
                    </MDBBtn>
                  </MDBCardFooter>
                </MDBCard>
                <Link to="/view-surveys">
                  <MDBBtn className="secondaryButton m-2">
                    <MDBIcon
                      icon="undo"
                      size="sm"
                      style={{ marginRight: "6px" }}
                    />
                    View Surveys
                  </MDBBtn>
                </Link>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
};

const Checkbox = ({ choices, handleChange, idx }) => {
  return (
    <>
      {choices.map((ch, index) => (
        <MDBCheckbox
          name="flexCheck"
          type="checkbox"
          value={ch}
          label={ch}
          key={index}
          onChange={(e) => handleChange(e.target.value, idx, index)}
        />
      ))}
    </>
  );
};

const Dropdown = ({ choices, handleChange, idx }) => {
  return (
    <>
      <select onChange={(e) => handleChange(e.target.value, idx)}>
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
