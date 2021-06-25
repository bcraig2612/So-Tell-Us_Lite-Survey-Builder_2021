import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Header from "../../components/header/header.component";

import {
  MDBRow,
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBTypography,
} from "mdb-react-ui-kit";

import { useHistory } from "react-router-dom";

import "./add-or-edit-survey-page.styles.scss";

const AddOrEditSurvey = () => {
  const [survey, setSurvey] = useState({
    id: null,
    name: "",
    elements: [],
  });
  const [edit, setEdit] = useState(false);
  const [draftType, setDraftType] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [draftChoices, setDraftChoices] = useState(["", ""]);

  const history = useHistory();

  useEffect(() => {
    let localSurveys = localStorage.surveys;

    localSurveys = JSON.parse(localSurveys);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("id");
    if (id) {
      localSurveys.map((s) => {
        if (s.id === id) {
          setSurvey(s);
          setEdit(true);
        }
      });
    } else {
      let newId = localSurveys.length + 1;
      setSurvey({ ...survey, id: newId.toString() });
    }
  }, []);

  const handleChoiceChange = (e, index) => {
    let choices = [...draftChoices];
    choices[index] = e.target.value;
    setDraftChoices(choices);
  };

  const handleChoiceAddition = () => {
    let choices = [...draftChoices];
    choices.push("");
    setDraftChoices(choices);
  };

  const handleQuestionRemoval = (index) => {
    let questions = [...survey.elements];
    questions.splice(index, 1);
    setSurvey({ ...survey, elements: questions });
  };

  const handleChoiceRemoval = (index) => {
    let choices = [...draftChoices];
    choices.splice(index, 1);
    setDraftChoices(choices);
  };

  const moveChoice = (currentIndex, newIndex, newState) => {
    var f = newState.splice(currentIndex, 1)[0];
    newState.splice(newIndex, 0, f);
    return newState;
  };

  const handleQuestionMovement = (event, index) => {
    let newState = survey.elements;
    if (event === "up") {
      let newIndex = index - 1;
      moveChoice(index, newIndex, newState);
      setSurvey({ ...survey, elements: newState });
    } else if (event === "down") {
      let newIndex = index + 1;
      moveChoice(index, newIndex, newState);
      setSurvey({ ...survey, elements: newState });
    }
  };

  const handleChoiceMovement = (event, index) => {
    let newState = draftChoices;
    if (event === "up") {
      let newIndex = index - 1;
      moveChoice(index, newIndex, newState);
      setDraftChoices([...newState]);
    } else if (event === "down") {
      let newIndex = index + 1;
      moveChoice(index, newIndex, newState);
      setDraftChoices([...newState]);
    }
  };

  const isDraftValid = () => {
    if (draftName.length) {
      if (draftType === "text") {
        return false;
      } else if (
        (draftType === "dropdown" || draftType === "checkbox") &&
        draftChoices[0].length &&
        draftChoices[1].length
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const submitQuestion = () => {
    let surveyElements = survey.elements;
    let newElement = {
      type: draftType,
      name: draftName,
    };
    if (draftType === "dropdown" || draftType === "checkbox") {
      newElement.choices = draftChoices;
    }

    surveyElements.push(newElement);

    setSurvey({ ...survey, elements: surveyElements });

    setDraftType(null);
    setDraftName("");
    setDraftChoices(["", ""]);
  };

  const isSurveyValid = () => {
    if (survey.name.length && survey.elements.length) {
      return false;
    } else {
      return true;
    }
  };

  const submitSurvey = () => {
    let localSurveys = localStorage.surveys;
    let surveyObj = JSON.parse(localSurveys);

    surveyObj.push(survey);
    localStorage.setItem("surveys", JSON.stringify(surveyObj));

    history.push(`/view-survey?id=${survey.id}`);
  };

  const updateSurvey = () => {
    let localSurveys = localStorage.surveys;
    let surveyObj = JSON.parse(localSurveys);

    surveyObj.map((s, index) => {
      if (s.id === survey.id) {
        surveyObj[index] = survey;
      }
    });

    localStorage.setItem("surveys", JSON.stringify(surveyObj));

    history.push(`/view-survey?id=${survey.id}`);
  };

  return (
    <>
      <MDBContainer>
        <MDBRow center>
          <MDBCol className="mt-2 px-1">
            <MDBCard
              className="align-items-center mt-2"
              style={{
                width: "100%",
                margin: "0 auto",
                border: "1px solid rgba(0,0,0,.125)",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
              }}
            >
            <Header />
              {edit ? (
                <>
                  <MDBTypography
                    className="mt-2 mb-4"
                    tag="h4"
                    variant="display-4"
                  >
                    Edit Survey
                  </MDBTypography>
                  <MDBCard
                    className="mb-2"
                    style={{
                      width: "95%",
                      minHeight: "40%",
                      padding: "7px",
                      border: "1px solid rgba(0,0,0,.125)",
                    }}
                  >
                    <MDBCardBody className="p-1 mb-1">
                      <MDBInputGroup className="mb-4">
                        <MDBInputGroupText
                          style={{
                            backgroundColor: "#E9ECEF",
                            color: "#212529",
                          }}
                        >
                          Survey Name
                        </MDBInputGroupText>
                        <MDBInputGroupElement
                          type="text"
                          defaultValue={`${survey.name}`}
                        />
                      </MDBInputGroup>
                      {survey.elements.map((el, index) => (
                        <div key={index}>
                          <MDBInputGroup className="mb-2">
                            <div
                              className="d-flex"
                              style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                marginRight: "6px",
                              }}
                            >
                              <MDBIcon
                                icon="caret-square-up"
                                style={{ color: "#78909C" }}
                                onClick={() =>
                                  handleQuestionMovement("up", index)
                                }
                                disabled={index === 0}
                              ></MDBIcon>
                              <MDBIcon
                                icon="caret-square-down"
                                style={{ color: "#78909C" }}
                                onClick={() =>
                                  handleQuestionMovement("down", index)
                                }
                                disabled={index === draftChoices.length - 1}
                              ></MDBIcon>
                            </div>
                            <MDBInputGroupText
                              style={{
                                backgroundColor: "#E9ECEF",
                                color: "#212529",
                              }}
                            >
                              Question Name
                            </MDBInputGroupText>
                            <MDBInputGroupElement type="text" value={el.name} />
                            <div
                              className="d-flex align-items-center p-1"
                              style={{ height: "35px" }}
                            >
                              <MDBBtn
                                size="sm"
                                floating
                                color="danger"
                                onClick={() => handleQuestionRemoval(index)}
                              >
                                <MDBIcon icon="minus" size="sm"></MDBIcon>
                              </MDBBtn>
                            </div>
                          </MDBInputGroup>
                          {el.type === "text" ? (
                            <MDBInput
                              className="mb-4"
                              type="text"
                              defaultValue="Type answer here..."
                              disabled
                            />
                          ) : el.type === "checkbox" ? (
                            <div
                              className="mb-4"
                              style={{ textAlign: "initial" }}
                            >
                              <Checkbox choices={el.choices} />
                            </div>
                          ) : el.type === "dropdown" ? (
                            <div
                              className="mb-4"
                              style={{ textAlign: "initial" }}
                            >
                              <Dropdown choices={el.choices} />
                            </div>
                          ) : null}
                        </div>
                      ))}

                      <div className="mb-2">
                        <MDBInputGroup className="mb-2">
                          <MDBInputGroupText
                            style={{
                              backgroundColor: "#E9ECEF",
                              color: "#212529",
                            }}
                          >
                            <b>
                              <i>New&nbsp;</i>
                            </b>
                            Question Name
                          </MDBInputGroupText>
                          <MDBInputGroupElement
                            type="text"
                            label="Question Name"
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                          />
                        </MDBInputGroup>
                      </div>
                      <MDBCol className="d-flex justify-content-between">
                        <MDBBtn
                          className="inputOption"
                          size="sm"
                          value="text"
                          style={{ backgroundColor: "#78909C" }}
                          onClick={(e) => setDraftType(e.target.value)}
                        >
                          Text Field
                        </MDBBtn>
                        <MDBBtn
                          className="inputOption"
                          size="sm"
                          value="dropdown"
                          style={{ backgroundColor: "#78909C" }}
                          onClick={(e) => setDraftType(e.target.value)}
                        >
                          Select
                        </MDBBtn>
                        <MDBBtn
                          className="inputOption"
                          size="sm"
                          value="checkbox"
                          style={{ backgroundColor: "#78909C" }}
                          onClick={(e) => setDraftType(e.target.value)}
                        >
                          Checkbox
                        </MDBBtn>
                      </MDBCol>

                      {draftType === "dropdown" || draftType === "checkbox" ? (
                        <>
                          {draftChoices.map((ch, index) => (
                            <>
                              <div className="d-flex mt-2">
                                <div className="d-flex w-100">
                                  <div
                                    className="d-flex"
                                    style={{
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      marginRight: "6px",
                                    }}
                                  >
                                    <MDBIcon
                                      icon="caret-square-up"
                                      style={{ color: "#78909C" }}
                                      onClick={() =>
                                        handleChoiceMovement("up", index)
                                      }
                                      disabled={index === 0}
                                    ></MDBIcon>
                                    <MDBIcon
                                      icon="caret-square-down"
                                      style={{ color: "#78909C" }}
                                      onClick={() =>
                                        handleChoiceMovement("down", index)
                                      }
                                      disabled={
                                        index === draftChoices.length - 1
                                      }
                                    ></MDBIcon>
                                  </div>
                                  <div className="flex-grow-1">
                                    <MDBInput
                                      type="text"
                                      key={index}
                                      value={ch}
                                      onChange={(e) =>
                                        handleChoiceChange(e, index)
                                      }
                                    />
                                  </div>
                                </div>

                                {draftChoices.length > 2 && (
                                  <div
                                    className="d-flex align-items-center p-1"
                                    style={{ height: "35px" }}
                                  >
                                    <MDBBtn
                                      size="sm"
                                      floating
                                      color="danger"
                                      onClick={() => handleChoiceRemoval(index)}
                                    >
                                      <MDBIcon icon="minus" size="sm"></MDBIcon>
                                    </MDBBtn>
                                  </div>
                                )}
                              </div>
                              <div className="d-flex mt-2 mb-1">
                                {index + 1 === draftChoices.length && (
                                  <MDBBtn
                                    size="sm"
                                    color="success"
                                    onClick={() => handleChoiceAddition()}
                                  >
                                    <MDBIcon
                                      icon="plus"
                                      size="sm"
                                      style={{ marginRight: "6px" }}
                                    ></MDBIcon>
                                    <span className="form-text text-white">
                                      Add
                                    </span>
                                  </MDBBtn>
                                )}
                              </div>
                            </>
                          ))}
                        </>
                      ) : null}
                    </MDBCardBody>
                    <MDBCardFooter className="d-flex justify-content-between mt-2 px-1">
                      <MDBBtn
                        size="sm"
                        color="success"
                        disabled={isDraftValid()}
                        onClick={() => submitQuestion()}
                      >
                        <MDBIcon
                          icon="check"
                          size="sm"
                          style={{ marginRight: "6px" }}
                        ></MDBIcon>
                        <span className="form-text text-white">Add Entry</span>
                      </MDBBtn>
                      <MDBBtn
                        type="submit"
                        disabled={isSurveyValid()}
                        onClick={() => updateSurvey()}
                      >
                        <MDBIcon
                          icon="check-double"
                          size="sm"
                          style={{ marginRight: "6px" }}
                        ></MDBIcon>
                        <span className="form-text text-white">
                          Update Survey
                        </span>
                      </MDBBtn>
                    </MDBCardFooter>
                  </MDBCard>
                </>
              ) : (
                <>
                  <MDBTypography
                    className="mt-2 mb-4"
                    tag="h4"
                    variant="display-4"
                  >
                    Create Survey
                  </MDBTypography>
                  <MDBCard
                    className="mb-2"
                    style={{
                      width: "95%",
                      minHeight: "40%",
                      padding: "7px",
                      border: "1px solid rgba(0,0,0,.125)",
                    }}
                  >
                    <MDBCardBody className="p-1">
                      <div>
                        <MDBInput
                          label="Survey Name"
                          wrapperClass="col-12 mb-3"
                          type="text"
                          onChange={(e) =>
                            setSurvey({ ...survey, name: e.target.value })
                          }
                          value={survey.name}
                        />
                      </div>
                      {survey.elements.length
                        ? survey.elements.map((el, index) => (
                            <div className="mb-3" key={index}>
                              <div className="form-text mb-1">{el.name}</div>
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
                          ))
                        : null}
                      <div className="mb-2">
                        <MDBInput
                          label="Question Name"
                          wrapperClass="col-12 mb-2"
                          type="text"
                          value={draftName}
                          onChange={(e) => setDraftName(e.target.value)}
                        />
                      </div>
                      <MDBCol className="d-flex justify-content-between">
                        <MDBBtn
                          className="inputOption"
                          size="sm"
                          value="text"
                          style={{ backgroundColor: "#78909C" }}
                          onClick={(e) => setDraftType(e.target.value)}
                        >
                          Text Field
                        </MDBBtn>
                        <MDBBtn
                          className="inputOption"
                          size="sm"
                          value="dropdown"
                          style={{ backgroundColor: "#78909C" }}
                          onClick={(e) => setDraftType(e.target.value)}
                        >
                          Select
                        </MDBBtn>
                        <MDBBtn
                          className="inputOption"
                          size="sm"
                          value="checkbox"
                          style={{ backgroundColor: "#78909C" }}
                          onClick={(e) => setDraftType(e.target.value)}
                        >
                          Checkbox
                        </MDBBtn>
                      </MDBCol>

                      {draftType === "dropdown" || draftType === "checkbox" ? (
                        <>
                          {draftChoices.map((ch, index) => (
                            <>
                              <div className="d-flex mt-2">
                                <div className="d-flex w-100">
                                  <div
                                    className="d-flex"
                                    style={{
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      marginRight: "6px",
                                    }}
                                  >
                                    <MDBIcon
                                      icon="caret-square-up"
                                      style={{ color: "#78909C" }}
                                      onClick={() =>
                                        handleChoiceMovement("up", index)
                                      }
                                      disabled={index === 0}
                                    ></MDBIcon>
                                    <MDBIcon
                                      icon="caret-square-down"
                                      style={{ color: "#78909C" }}
                                      onClick={() =>
                                        handleChoiceMovement("down", index)
                                      }
                                      disabled={
                                        index === draftChoices.length - 1
                                      }
                                    ></MDBIcon>
                                  </div>
                                  <div className="flex-grow-1">
                                    <MDBInput
                                      type="text"
                                      key={index}
                                      value={ch}
                                      onChange={(e) =>
                                        handleChoiceChange(e, index)
                                      }
                                    />
                                  </div>
                                </div>

                                {draftChoices.length > 2 && (
                                  <div
                                    className="d-flex align-items-center p-1"
                                    style={{ height: "35px" }}
                                  >
                                    <MDBBtn
                                      size="sm"
                                      floating
                                      color="danger"
                                      onClick={() => handleChoiceRemoval(index)}
                                    >
                                      <MDBIcon icon="minus" size="sm"></MDBIcon>
                                    </MDBBtn>
                                  </div>
                                )}
                              </div>
                              <div className="d-flex mt-2 mb-1">
                                {index + 1 === draftChoices.length && (
                                  <MDBBtn
                                    size="sm"
                                    color="success"
                                    onClick={() => handleChoiceAddition()}
                                  >
                                    <MDBIcon
                                      icon="plus"
                                      size="sm"
                                      style={{ marginRight: "6px" }}
                                    ></MDBIcon>
                                    <span className="form-text text-white">
                                      Add
                                    </span>
                                  </MDBBtn>
                                )}
                              </div>
                            </>
                          ))}
                        </>
                      ) : null}
                    </MDBCardBody>
                    <MDBCardFooter className="d-flex justify-content-between mt-2 px-1">
                      <MDBBtn
                        size="sm"
                        color="success"
                        disabled={isDraftValid()}
                        onClick={() => submitQuestion()}
                      >
                        <MDBIcon
                          icon="check"
                          size="sm"
                          style={{ marginRight: "6px" }}
                        ></MDBIcon>
                        <span className="form-text text-white">Add Entry</span>
                      </MDBBtn>

                      <MDBBtn
                        type="submit"
                        disabled={isSurveyValid()}
                        onClick={() => submitSurvey()}
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
                </>
              )}
              <Link to="/view-surveys">
                <MDBBtn className="m-2" style={{ backgroundColor: "#78909C" }}>
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

export default AddOrEditSurvey;
