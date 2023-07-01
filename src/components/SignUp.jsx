import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { handleClickMessageButton, signUp} from "../store/Reducers/authorizationReducer";
import { connect } from "react-redux";
import { getAllOfficers, handleClickModalButton} from "../store/Reducers/officersReducer";
import MainButton from "./Modal/MainButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import { useNavigate, Link } from "react-router-dom";
import back from "../img/back.svg"
import success from "../img/success.svg"


const SignUp = (props) => {
  const navigate = useNavigate();

  const {
    signUp,
    createOfficer,
    isLoading,
    isRegistered,
    messageAuthorization,
    messageOfficers,
    handleClickMessageButton,
    officerIsCreated,
  } = props;

  const handleClickMessage = () => {
    navigate(`/auth/sign_in`);
    handleClickMessageButton();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        clientId: "",
        firstName: "",
        lastName: "",
        approved: false,
        agreement: false,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Пожалуйста введите верный e-mail адрес")
          .required("Это поле обязательно для заполнения"),
        password: Yup.string()
          .min(3, "Пароль должен быть более 3 символов")
          .max(12, "Пароль должен быть менее 12 символов")
          .required("Это поле обязательно для заполнения"),
        clientId: Yup.string().required("Это поле обязательно для заполнения"),
        firstName: Yup.string().max(
          15,
          "Это поле может быть менее 15 символов"
        ),
        lastName: Yup.string().max(
          20,
          "Это поле может быть менее 20 символов"
        ),
        agreement: Yup.boolean().oneOf(
          [true],
          "Вы должны согласиться перед регистрацией"
        ),
      })}
      onSubmit={(values) => {
        signUp(values);
        createOfficer(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {messageAuthorization || messageOfficers ? (
                  <Message
                    message={messageAuthorization || messageOfficers}
                    onClick={handleClickMessage}
                  />
                ) : (
                  <div className="signIn">
                    <Link onClick={() => navigate(-1)}>
                      <img src={back} alt="logo" className="caseDetail__back" />
                    </Link>
                    <div className="signIn__authWay">
                      <Link to="/auth/sign_in" className="signIn__authWay__link">
                        Авторизация
                      </Link>
                      <Link to="/auth/sign_up" className="signIn__authWay__link__active">
                        Регистрация
                      </Link>
                    </div>
                    <Form className="signIn__form">
                      <div className="signIn__form__item">
                        <label className="signIn__form__item__label" htmlFor="email">
                          E-mail:
                          <span className="case__card__form__item__label__reqired">*</span>
                        </label>
                        <div className="signIn__form__item__container">
                          <Field
                            type="email"
                            className="signIn__form__item__container__input"
                            id="email"
                            name={"email"}
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
                        <label htmlFor="password" className="signIn__form__item__label">
                          Пароль:
                          <span className="case__card__form__item__label__reqired">*</span>
                        </label>
                        <div className="signIn__form__item__container">
                          <Field
                            type="password"
                            className="signIn__form__item__container__input"
                            id="password"
                            name={"password"}
                            placeholder="Пароль"
                            autoComplete="on"
                          />
                          <ErrorMessage
                            name={"password"}
                            className="signIn__form__item__container__invalid"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="signIn__form__item">
                        <label htmlFor="clientId" className="signIn__form__item__label">
                          ID:
                          <span className="case__card__form__item__label__reqired">*</span>
                        </label>
                        <div className="signIn__form__item__container">
                          <Field
                            type="text"
                            className="signIn__form__item__container__input"
                            id="clientId"
                            name={"clientId"}
                            placeholder="ID клиента"
                          />
                          <ErrorMessage
                            name={"clientId"}
                            className="signIn__form__item__container__invalid"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="signIn__form__item">
                        <label htmlFor="firstName" className="signIn__form__item__label">
                          Имя:
                        </label>
                        <Field
                          type="text"
                          className="signIn__form__item__input"
                          id="firstName"
                          name={"firstName"}
                          placeholder="Имя"
                        />
                      </div>

                      <div className="signIn__form__item">
                        <label htmlFor="lastName" className="signIn__form__item__label">
                          Фамилия:
                        </label>
                        <Field
                          type="text"
                          className="signIn__form__item__input"
                          id="lastName"
                          name={"lastName"}
                          placeholder="Фамилия"
                        />
                      </div>

                      <div className="signIn__form__item approved">
                        <label htmlFor="approved" className="signIn__form__item__label">
                          Одобрен:
                        </label>
                        <Field
                          as={"select"}
                          className="signIn__form__item__select"
                          id="approved"
                          name={"approved"}
                          disabled
                        >
                          <option value={"false"}>Не одобрен</option>
                        </Field>
                      </div>

                      <div className="signIn__form__item">
                          <div className="signIn__form__item__agree">
                            <div className="signIn__form__item__agree__styledCheckbox">
                              <Field
                                className="signIn__form__item__agree__checkbox"
                                type={"checkbox"}
                                name={"agreement"}
                                id="agreement"
                              />
                            </div>
                              <label
                                className="signIn__form__item__label"
                                htmlFor="agreement"
                              >
                                Согласен с условиями и правилами
                                <span className="case__card__form__item__label__reqired">*</span>
                              </label>
                          </div>
                          <MainButton
                            className="signIn__form__button"
                            title={"Зарегистрироваться"}
                            type={"submit"}
                            disabled={!(formik.isValid && formik.dirty)}
                          />
                        </div>
                    </Form>
                  </div>
                )}
              </>
            )}

            {isRegistered? (
              <div className="case__card__success visible">
                {/* <button className="visible" onClick={handleCloseSuccess}>close</button> */}
                <img src={success} alt="logo" className="case__card__success__img" />
                <p>Регистрация прошла успешно успешно</p>
                <Link className="case__card__success__button" to="/auth/sign_in">
                  Войти
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
      messageAuthorization: state.authorizationReducer.message,
      messageOfficers: state.officersReducer.message,
      isLoading: state.authorizationReducer.isLoading,
      isRegistered: state.authorizationReducer.isRegistered,
      officerIsCreated: state.officersReducer.officerIsCreated,
    };
  },
  (dispatch) => {
    return {
      signUp: (values) => dispatch(signUp(values)),
      getAllOfficers: () => dispatch(getAllOfficers()),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(SignUp);