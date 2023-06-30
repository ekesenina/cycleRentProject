import React from "react";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { createCasePublic, handleClickMessageButton } from "../store/Reducers/casesReducer";
import MainButton from "./Modal/MainButton";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import back from "../img/back.svg"
import success from "../img/success.svg"

const NewCasePublic = (props) => {
  const navigate = useNavigate();

  const {
    createCasePublic,
    bicycleType,
    isLoading,
    message,
    handleClickMessageButton,
    caseIsCreated,
  } = props;

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const showSuccessMessage = () => {
    setSuccessVisible(true);
    setTimeout(() => {
      setSuccessVisible(false);
    }, 3000);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        licenseNumber: "",
        ownerFullName: "",
        type: "",
        clientId: "",
        color: "",
        date: "",
        description: "",
        agreement: false,
      }}
      validationSchema={Yup.object({
        licenseNumber: Yup.string().required("Это поле обязательно для заполнения"),
        ownerFullName: Yup.string().required("Это поле обязательно для заполнения"),
        type: Yup.string().required("Это поле обязательно для заполнения"),
        clientId: Yup.string().required("Это поле обязательно для заполнения"),
        color: Yup.string(),
        date: Yup.date(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf([true]),
      })}
      onSubmit={(values) => {
        createCasePublic(values);
        showSuccessMessage();
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
                  <div className="case">
                    <Link onClick={() => navigate(-1)}>
                      <img src={back} alt="logo" className="case__back" />
                    </Link>
                    <Form className="case__card">
                      <h1 className="case__card__h1">cообщите о краже</h1>
                      <div className="case__card__form">
                        <div className="case__card__form__item">
                          <label 
                            htmlFor="licenseNumber" 
                            className="case__card__form__item__label"
                          >
                            Лицензионный номер:
                            <span className="case__card__form__item__label__reqired">*</span>
                          </label>
                          <Field
                            type="text"
                            name={"licenseNumber"}
                            className="case__card__form__item__input"
                            placeholder="Лицензионный номер '12345'"
                            id="licenseNumber"
                            pattern="^[ 0-9]+$" 
                            required
                          />
                          <ErrorMessage
                            name={"licenseNumber"}
                            className="case__card__form__item__input__invalid"
                            component="div"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label 
                            htmlFor="ownerFullName" 
                            className="case__card__form__item__label"
                          >
                            ФИО:
                            <span className="case__card__form__item__label__reqired">*</span>
                          </label>
                          <Field
                            type="text"
                            name={"ownerFullName"}
                            className="case__card__form__item__input"
                            placeholder="ФИО владельца"
                            id="ownerFullName"
                            required
                          />
                          <ErrorMessage
                            name={"ownerFullName"}
                            className="case__card__form__item__input__invalid"
                            component="div"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label 
                            htmlFor="type" 
                            className="case__card__form__item__label"
                          >
                            Тип <br/> велосипеда:
                            <span className="case__card__form__item__label__reqired">*</span>
                          </label>
                          <Field
                            as={"select"}
                            className="case__card__form__item__select"
                            name={"type"}
                            id="type"
                            required
                          >
                            <option value="DEFAULT" disabled>
                              Выберите...
                            </option>
                            {bicycleType &&
                              bicycleType.map((item, index) => {
                                return (
                                  <option value={item.value} key={index}>
                                    {item.title}
                                  </option>
                                );
                              })}
                          </Field>
                          <ErrorMessage
                            name={"type"}
                            className="case__card__form__item__input__invalid"
                            component="div"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label 
                            htmlFor="clientId" 
                            className="case__card__form__item__label"
                          >
                            ID клиента:
                            <span className="case__card__form__item__label__reqired">*</span>
                          </label>
                          <Field
                            type="text"
                            name={"clientId"}
                            className="case__card__form__item__input"
                            placeholder="ID клиента"
                            id="clientId"
                            required
                          />
                          <ErrorMessage
                            name={"clientId"}
                            className="case__card__form__item__input__invalid"
                            component="div"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label 
                            htmlFor="color" 
                            className="case__card__form__item__label"
                          >
                            Цвет <br/> велосипеда:
                          </label>
                          <Field
                            type="text"
                            name={"color"}
                            className="case__card__form__item__input"
                            placeholder="Цвет"
                            id="color"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label 
                            htmlFor="date" 
                            className="case__card__form__item__label"
                          >
                            Дата:
                          </label>
                          <Field
                            type="date"
                            name={"date"}
                            className="case__card__form__item__input"
                            id="date"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label 
                            htmlFor="description" 
                            className="case__card__form__item__label"
                          >
                            Описание:
                          </label>
                          <Field
                            as={"textarea"}
                            className="case__card__form__item__input"
                            name={"description"}
                            id="description"
                            placeholder="Опишите велосипед"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <div className="case__card__form__item__agree">
                            <div className="case__card__form__item__agree__styledCheckbox">
                              <Field
                                className="case__card__form__item__agree__checkbox"
                                type={"checkbox"}
                                name={"agreement"}
                                id="agreement"
                              />
                            </div>
                              <label
                                className="case__card__form__item__label"
                                htmlFor="agreement"
                              >
                                Согласен с условиями и правилами
                                <span className="case__card__form__item__label__reqired">*</span>
                              </label>
                          </div>
                          <MainButton
                             className="case__card__form__item__button"
                            title={"отправить"}
                            type={"submit"}
                            disabled={!(formik.isValid && formik.dirty)}
                          />
                        </div>
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}
            {caseIsCreated && (
              <div className={`case__card__success ${isSuccessVisible ? 'visible' : 'unvisible'}`}>
                {/* <button className="visible" onClick={handleCloseSuccess}>close</button> */}
                <img src={success} alt="logo" className="case__card__success__img" />
                <p>Ваше сообщение успешно отправлено</p>
              </div>
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
      officers: state.officersReducer.officers,
      bicycleType: state.casesReducer.bicycle.bicycleType,
      isLoadingCases: state.casesReducer.isLoading,
      message: state.casesReducer.message,
      caseIsCreated: state.casesReducer.caseIsCreated,
    };
  },
  (dispatch) => {
    return {
      createCasePublic: (values) => dispatch(createCasePublic(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton())
    };
  }
)(NewCasePublic);