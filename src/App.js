import React from "react";
import { Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NewCase from "./components/NewCase";
import NewCasePublic from "./components/NewCasePublic";
import CasesList from "./components/CasesList";
import CaseDetail from "./components/CaseDetail";
import OfficersList from "./components/OfficersList";
import OfficerDetail from "./components/OfficerDetail";
import { connect } from "react-redux";



function App(props) {
  const { isAuthorized } = props;

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth/sign_in" element={<SignIn />} />
          <Route path="auth/sign_up" element={<SignUp />} />

          {isAuthorized && <Route path="cases" element={<CasesList />} />}
          {isAuthorized ? (
            <Route path="create_case" element={<NewCase />} />
          ) : (
            <Route
              path="create_case_public"
              element={<NewCasePublic />}
            />
          )}
          {isAuthorized && (
            <Route path="cases/:id" element={<CaseDetail />} />
          )}
          {isAuthorized && (
            <Route path="officers" element={<OfficersList />} />
          )}
          {isAuthorized && (
            <Route path="officers/:id" element={<OfficerDetail />} />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default connect((state) => {
  return {
    isAuthorized: state.authorizationReducer.isAuthorized,
  };
})(App);