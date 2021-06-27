import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './themes.styles';

import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import ViewSurveys from "./pages/view-surveys-page/view-surveys.component";
import ViewSurvey from "./pages/view-survey-page/view-survey.component";
import AddOrEditSurvey from "./pages/add-or-edit-survey-page/add-or-edit-survey-page.component";
import UserAccount from "./pages/user-account/user-account.component";

function App() {

  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyles />
      <div className="App">
        <button onClick={ () => themeToggler() }>Change Theme</button>
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route exact path="/view-surveys" component={ViewSurveys} />
          <Route exact path="/view-survey" component={ViewSurvey} />
          <Route exact path='/add-or-edit-survey' component={AddOrEditSurvey} />
          <Route exact path='/account-details' component={UserAccount} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
