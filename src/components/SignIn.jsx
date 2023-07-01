import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleClickMessageButton, signIn} from "../store/Reducers/authorizationReducer";
import MainButton from "./Modal/MainButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import back from "../img/back.svg"
import success from "../img/success.svg"

const SignIn = (props) => {
  const { 
    signIn,
    message, 
    isLoading, 
    handleClickMessageButton, 
    isAuthorized 
  } = props;

  const navigate = useNavigate();

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Введите верный e-mail адрес")
          .required("Это поле обязательно для заполнения"),
        password: Yup.string()
          .min(3, "Пароль должен быть более 3 символов")
          .max(12, "Пароль должен быть менее 12 символов")
          .required("Это поле обязательно для заполнения"),
      })}
      onSubmit={(values) => {
        signIn(values);
      }}
    >
      {(formik) => {
        return (
          <>
          {isLoading ? (
            <Loading />
            ) : (
            <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <div className="signIn">
                    <Link onClick={() => navigate(-1)}>
                      <img src={back} alt="logo" className="caseDetail__back" />
                    </Link>
                    <div className="signIn__authWay">
                      <Link to="/auth/sign_in" className="signIn__authWay__link__active">
                        Авторизация
                      </Link>
                      <Link to="/auth/sign_up" className="signIn__authWay__link">
                        Регистрация
                      </Link>
                    </div>
                    <Form className="signIn__form">
                      <div className="signIn__form__item">
                        <label className="signIn__form__item__label" htmlFor="email">
                          E-mail:
                        </label>
                        <div className="signIn__form__item__container">
                          <Field
                            type="email"
                            className="signIn__form__item__container__input"
                            id="email"
                            name={"email"}
                            autoComplete="e-mail"
                            placeholder="name@example.com"
                          />
                          <ErrorMessage
                            name={"email"}
                            className="signIn__form__item__container__invalid"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="signIn__form__item">
                        <label className="signIn__form__item__label" htmlFor="password">
                          Пароль:
                        </label>
                        <div className="signIn__form__item__container">
                          <Field
                            type="password"
                            className="signIn__form__item__container__input"
                            id="password"
                            name={"password"}
                            autoComplete="on"
                            placeholder="Пароль"
                          />
                          <ErrorMessage
                            name={"password"}
                            className="signIn__form__item__container__invalid"
                            component="div"
                          />
                        </div>
                      </div>

                      <MainButton
                        title={"Войти"}
                        className="signIn__form__button"
                        type={"submit"}
                        disabled={!(formik.isValid && formik.dirty)}
                      />
                    </Form>
                  </div>
                )}
              </>
            )}

            {isAuthorized ? (
              <div className="case__card__success visible">
                {/* <button className="visible" onClick={handleCloseSuccess}>close</button> */}
                <img src={success} alt="logo" className="case__card__success__img" />
                <p>Вход выполнен успешно</p>
                <Link className="case__card__success__button" to="/">
                  Вернуться на главную
                </Link>
              </div>
            ) : null}
          </>
        );
      }}
    </Formik>
  );
};

export default connect(
  (state) => {
    return {
      message: state.authorizationReducer.message,
      isLoading: state.authorizationReducer.isLoading,
      isAuthorized: state.authorizationReducer.isAuthorized,
    };
  },
  (dispatch) => {
    return {
      signIn: (values) => dispatch(signIn(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(SignIn);