import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import {
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
} from "mdb-react-ui-kit";

const UserAccount = () => {
  const [account, setAccount] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });

  const history = useHistory();

  useEffect(() => {
    let localAccount = localStorage.account;
    localAccount = JSON.parse(localAccount);
    setAccount(localAccount);
  }, []);

  const isFormValid = () => {
    let localAccount = localStorage.account;

    localAccount = JSON.parse(localAccount);

    if (
      (localAccount.firstName !== account.firstName ||
        localAccount.lastName !== account.lastName) &&
      account.firstName.length &&
      account.lastName.length
    ) {
      return false;
    } else {
      return true;
    }
  };

  const updateAccountDetails = () => {
    localStorage.setItem("account", JSON.stringify(account));
    history.push("/view-surveys");
  };
  console.log(account);
  return (
    <>
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
              <MDBTypography className="mt-2 mb-4" tag="h4" variant="display-4">
                Account Details
              </MDBTypography>
              <MDBCard
                className="mb-2"
                style={{
                  width: "95%",
                  padding: "7px",
                  border: "1px solid rgba(0,0,0,.125)",
                }}
              >
                <MDBCardBody className="p-1">
                  <MDBInputGroup className="mb-3">
                    <MDBInputGroupText
                      style={{
                        backgroundColor: "#E9ECEF",
                        color: "#212529",
                      }}
                    >
                      First Name
                    </MDBInputGroupText>
                    <MDBInputGroupElement
                      type="text"
                      value={account.firstName}
                      onChange={(e) =>
                        setAccount({ ...account, firstName: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                  <MDBInputGroup className="mb-1">
                    <MDBInputGroupText
                      style={{
                        backgroundColor: "#E9ECEF",
                        color: "#212529",
                      }}
                    >
                      Last Name
                    </MDBInputGroupText>
                    <MDBInputGroupElement
                      type="text"
                      value={account.lastName}
                      onChange={(e) =>
                        setAccount({ ...account, lastName: e.target.value })
                      }
                    />
                  </MDBInputGroup>
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-between mt-2 px-1 pb-0">
                  <MDBBtn
                    className="primaryButton m-2"
                    size="sm"
                    onClick={() => updateAccountDetails()}
                    disabled={isFormValid()}
                  >
                    Update Info
                  </MDBBtn>
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
                </MDBCardFooter>
              </MDBCard>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default UserAccount;
