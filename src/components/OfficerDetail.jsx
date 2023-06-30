import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { editOfficer, getOneOfficer, handleClickMessageButton } from "../store/Reducers/officersReducer";
import SecondaryButton from "./Modal/SecondaryButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import back from "../img/back.svg"
import officerImg from "../img/officerImg.svg"


const OfficerDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    editOfficer,
    isLoading,
    message,
    getOneOfficer,
    officer,
    handleClickMessageButton,
  } = props;

  const [isClickedFirstName, setIsClickedFirstName] = useState(false);
  const [isClickedLastName, setIsClickedLastName] = useState(false);
  const [isClickedPassword, setIsClickedPassword] = useState(false);

  const handleClickFirstName = () => {
    setIsClickedFirstName((prevState) => !prevState);
  };
  const handleClickLastName = () => {
    setIsClickedLastName((prevState) => !prevState);
  };
  const handleClickPassword = () => {
    setIsClickedPassword((prevState) => !prevState);
  };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.which === 13 || e.keyCode === 13) {
      setIsClickedFirstName(false);
      setIsClickedLastName(false);
    }
  };

  useEffect(() => {
    getOneOfficer(id);
  }, [dispatch, getOneOfficer, id]);

  const handleClickMessage = () => {
    navigate(`/officers`);
    handleClickMessageButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: officer.firstName || "",
        lastName: officer.lastName || "",
        oldPassword: officer.password || "",
        newPassword: "",
        passwordConfirmation: "",
        approved: officer.approved || "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(
          15,
          "Это поле может содержать менее 15 символов"
        ),
        lastName: Yup.string().max(
          20,
          "Это поле может содержать менее 20 символов"
        ),
        oldPassword: Yup.string(),
        newPassword: Yup.string().when((isClickedPassword, schema) => {
          if (isClickedPassword)
            return schema
              .min(3, "Пароль должен быть больше 3 символов")
              .max(1200, "Пароль должен быть меньше 1200 символов")
              .required("Это поле обязательно для заполнения");
        }),
        passwordConfirmation: Yup.string()
          .when("password", (isClickedPassword, schema) => {
            if (isClickedPassword)
              return schema.required("Подтверждение нового пароля обязательно");
          })
          .oneOf([Yup.ref(" newPassword")], "Пароли должны быть одинаковыми"),
        approved: Yup.boolean(),
      })}
      onSubmit={(values) => {
        editOfficer(officer._id, values);
        setIsClickedFirstName(false);
        setIsClickedLastName(false);
        setIsClickedPassword(false);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <div className="caseDetail">
                    <Link onClick={() => navigate(-1)}>
                      <img src={back} alt="logo" className="caseDetail__back" />
                    </Link>
                    <img
                      src={officerImg}
                      className="caseDetail__photo"
                      alt={"Officer"}
                    />
                    <Form className="caseDetail__form">
                      <div
                        className="caseDetail__form__item"
                        onClick={handleClickFirstName}
                      >
                        <div className="caseDetail__form__item__label">Имя</div>
                        <div className="caseDetail__form__item__enabled">
                          {!isClickedFirstName ? (
                            values.firstName
                          ) : (
                            <Field
                              type="text"
                              name="firstName"
                              className="caseDetail__form__item__input"
                              placeholder={"Ваше имя"}
                              onKeyPress={handleKeyPress}
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                          <ErrorMessage
                            className="caseDetail__form__item__input__invalid"
                            component="div"
                            name="firstName"
                          />
                        </div>
                      </div>

                      <div
                        className="caseDetail__form__item"
                        onClick={handleClickLastName}
                      >
                        <div className="caseDetail__form__item__label">Фамилия</div>
                        <div className="caseDetail__form__item__enabled">
                          {!isClickedLastName ? (
                            values.lastName
                          ) : (
                            <Field
                              type="text"
                              name="lastName"
                              className="caseDetail__form__item__input"
                              placeholder={"Ваша фамилия"}
                              onKeyPress={handleKeyPress}
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                          <ErrorMessage
                            component="div"
                            name="lastName"
                            className="caseDetail__form__item__input__invalid"
                          />
                        </div>
                      </div>

                      <div className="caseDetail__form__item">
                        <div className="caseDetail__form__item__label">E-mail</div>
                        <div className="caseDetail__form__item__disabled">{officer.email}</div>
                      </div>

                      {!isClickedPassword && (
                        <div
                          className="caseDetail__form__item"
                          onClick={handleClickPassword}
                        >
                          <div className="caseDetail__form__item__label">Пароль</div>
                          <div className="caseDetail__form__item__enabled"> Сменить пароль</div>
                        </div>
                      )}

                      {isClickedPassword && (
                        <div
                          className="caseDetail__form__item"
                          onClick={handleClickPassword}
                        >
                          <div className="caseDetail__form__item__label">Новый пароль</div>
                          <div className="caseDetail__form__item__enabled">
                            <Field
                              type="password"
                              name={"newPassword"}
                              className="caseDetail__form__item__input"
                              placeholder={"Введите новый пароль"}
                              onKeyPress={handleKeyPress}
                              autoComplete="on"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <ErrorMessage
                              component="div"
                              name="newPassword"
                              className="caseDetail__form__item__input__invalid"
                            />
                          </div>
                        </div>
                      )}

                      {isClickedPassword && (
                        <div
                          className="caseDetail__form__item"
                          onClick={handleClickPassword}
                        >
                          <div className="caseDetail__form__item__label">
                            Подтвердите <br /> новый пароль
                          </div>
                          <div className="caseDetail__form__item__enabled">
                            <Field
                              type="password"
                              name={"passwordConfirmation"}
                              className="caseDetail__form__item__input"
                              placeholder={"Повторно введите новый пароль"}
                              onKeyPress={handleKeyPress}
                              autoComplete="on"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <ErrorMessage
                              component="div"
                              name="passwordConfirmation"
                              className="caseDetail__form__item__input__invalid"
                            />
                          </div>
                        </div>
                      )}

                      <div className="caseDetail__form__item">
                        <div className="caseDetail__form__item__label">ID</div>
                        <div className="caseDetail__form__item__disabled">{officer.clientId}</div>
                      </div>

                      <div className="caseDetail__form__item">
                        <div className="caseDetail__form__item__label">Одобрен</div>
                        <div className="caseDetail__form__item__enabled">
                          <Field
                            className="caseDetail__form__item__input"
                            type="checkbox"
                            name={"approved"}
                          />
                        </div>
                      </div>
                      <div>
                        <SecondaryButton
                          title={"Сохранить изменения"}
                          type="submit"
                          className="caseDetail__button"
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}
          </>
        );
      }}
    </Formik>
  );
};
export default connect(
  (state) => {
    return {
      officer: state.officersReducer.officer,
      isLoading: state.officersReducer.isLoading,
      message: state.officersReducer.message,
    };
  },
  (dispatch) => {
    return {
      editOfficer: (id, values) => dispatch(editOfficer(id, values)),
      getOneOfficer: (id) => dispatch(getOneOfficer(id)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(OfficerDetail);
