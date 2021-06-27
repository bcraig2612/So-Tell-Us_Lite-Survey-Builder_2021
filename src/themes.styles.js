import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  backgroundColor: "#FFFFFF",
  fontColor: "#000000",
  buttonTextColor: "#F5F5F5",
  formTextColor: "#757575",
  formControlColor: "#4F4F4F",
  formControlBackgroundColor: "#FFFFFF",
  formLabelColor: "rgba(0,0,0,.6)",
  border: "1px solid rgb(0, 0, 0, 0.125)",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
  primaryButtonBackgroundColor: "#1266F1",
  primaryButtonHoverBackgroundColor: "#0C56D0",
  primaryButtonDisabledBackgroundColor: "#4F8DF5",
  secondaryButtonBackgroundColor: "#78909C",
  secondaryButtonHoverBackgroundColor: "#5D747F",
  secondaryIconBackgroundColor: "#78909C",
  tertiaryButtonBackgroundColor: "#FF3855",
  tertiaryButtonHoverBackgroundColor: "#F90024",
  quaternaryButtonBackgroundColor: "#00B74A",
  quaternaryButtonHoverBackgroundColor: "#00913B",
  quaternaryButtonDisabledBackgroundColor: "#00E55D",
};

export const darkTheme = {
  backgroundColor: "#101416",
  fontColor: "#F5F5F5",
  buttonTextColor: "#F5F5F5",
  formTextColor: "#F5F5F5",
  formControlColor: "#4F4F4F",
  formControlBackgroundColor: "#F5F5F5",
  formLabelColor: "rgba(0, 0, 0, .6)",
  border: "1px solid rgb(245, 245, 245, 0.25)",
  boxShadow: "0 10px 15px -3px rgba(245, 245, 245,0.2)",
  primaryButtonBackgroundColor: "#4F8DF5",
  primaryButtonHoverBackgroundColor: "#1266F1",
  primaryButtonDisabledBackgroundColor: "#9CBFF9",
  secondaryButtonBackgroundColor: "#A0B1B9",
  secondaryButtonHoverBackgroundColor: "#78909C",
  secondaryIconBackgroundColor: "#A0B1B9",
  tertiaryButtonBackgroundColor: "#FF8697",
  tertiaryButtonHoverBackgroundColor: "#FF3855",
  quaternaryButtonBackgroundColor: "#00E55D",
  quaternaryButtonHoverBackgroundColor: "#00B74A",
  quaternaryButtonDisabledBackgroundColor: "#1FFF7A",
};

export const GlobalStyles = createGlobalStyle`
  body {
      background-color: ${(props) => props.theme.backgroundColor};
      color: ${(props) => props.theme.fontColor};
  }

  ${"" /* Circle */}
  .form-switch .form-check-input:after {
    background-color: #F5F5F5;
  }
  .form-check-input[type=checkbox]:focus:after {
    background-color: #F5F5F5;
  }


  .form-switch .form-check-input:checked[type=checkbox]:after {
    background-color: #34323D;
  }
  .form-switch .form-check-input:checked[type=checkbox]:focus:after {
    background-color: #34323D;
  }

  ${"" /* Light Not Focused */}
  .form-switch .form-check-input {
    background-color: #34323D;
  }

  ${"" /* Light Focused */}
  .form-switch .form-check-input:focus {
    background-color: #34323D;
  }

  ${"" /* Dark Focused */}
  .form-check-input[type=checkbox]:checked:focus {
    background-color: #F5F5F5;
  }

    ${"" /* Dark Not Focused */}
  .form-check-input[type=checkbox]:checked {
    background-color: #F5F5F5;
  }

  ${
    "" /* .form-switch .form-check-input {

  } */
  }

  div.card {
      background-color: ${(props) => props.theme.backgroundColor} !important;
      color: ${(props) => props.theme.fontColor} !important;
      border: ${(props) => props.theme.border} !important;
      box-shadow: ${(props) => props.theme.boxShadow} !important;

    .form-text {
      color: ${(props) => props.theme.formTextColor};
    }

    .form-control {
      color: ${(props) => props.theme.formControlColor};
      background-color: ${(props) => props.theme.formControlBackgroundColor};
    }

    .form-outline {
      padding-left: 0px;
      padding-right: 0px;
    }

    .secondaryIcon {
      color: ${(props) => props.theme.secondaryIconBackgroundColor};
    }

    button {
      color: ${(props) => props.theme.buttonTextColor};
    }

    .primaryButton {
      background-color: ${(props) => props.theme.primaryButtonBackgroundColor};

      &:hover {
        background-color: ${(props) =>
          props.theme.primaryButtonHoverBackgroundColor};
      }

      &:disabled {
        background-color: ${(props) =>
          props.theme.primaryButtonDisabledBackgroundColor};
      }
    }

    .secondaryButton {
      background-color: ${(props) =>
        props.theme.secondaryButtonBackgroundColor};

      &:hover {
        background-color: ${(props) =>
          props.theme.secondaryButtonHoverBackgroundColor};
      }
    }

    .tertiaryButton {
      background-color: ${(props) => props.theme.tertiaryButtonBackgroundColor};

      &:hover {
        background-color: ${(props) =>
          props.theme.tertiaryButtonHoverBackgroundColor};
      }
    }

    .quaternaryButton {
      background-color: ${(props) =>
        props.theme.quaternaryButtonBackgroundColor};

      &:hover {
        background-color: ${(props) =>
          props.theme.quaternaryButtonHoverBackgroundColor};
      }

      &:disabled {
        background-color: ${(props) =>
          props.theme.quaternaryButtonDisabledBackgroundColor};
      }
    }

    #createSurvey {
      color: ${(props) => props.theme.fontColor};
    }

    .form-outline .form-control~.form-label {
      color: ${(props) => props.theme.formLabelColor};
    }
  }
`;
