import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  backgroundColor: "#FFF",
  fontColor: "#000",
  formTextColor: "#757575",
  formControlColor: "#4F4F4F",
  border: "1px solid rgb(0, 0, 0, 0.125)",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
};

export const darkTheme = {
  backgroundColor: "#101416",
  fontColor: "#FFF",
  formTextColor: "#FFF",
  formControlColor: "#FFF",
  border: "1px solid rgb(255, 255, 255, 0.25)",
  boxShadow: "0 10px 15px -3px rgba(255, 255, 255,0.2)",
};

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.fontColor};
    }

    div.card {
        background-color: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.fontColor};
        border: ${(props) => props.theme.border};
        box-shadow: ${(props) => props.theme.boxShadow};

      .form-text {
        color: ${(props) => props.theme.formTextColor};
      }

      .form-control {
        color: ${(props) => props.theme.formControlColor};
      }
    }
`;
