import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect} from "react-redux";
import { createCase, handleClickMessageButton } from "../store/Reducers/casesReducer";
import { getAllOfficers } from "../store/Reducers/officersReducer";
import MainButton from "./Modal/MainButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import { useNavigate, Link } from "react-router-dom";
import back from "../img/back.svg"
import success from "../img/success.svg"

const NewCase = (props) => {

  const navigate = useNavigate();

  const {
    officers,
    bicycleType,
    getAllOfficers,
    createCase,
    isLoadingCases,
    message,
    handleClickMessageButton,
    caseIsCreated
  } = props;

  useEffect(() => {
    getAllOfficers();
  }, [getAllOfficers]);

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const [isSuccessVisible, setSuccessVisible] = useState(false);

  // const handleCloseSuccess = () => {
  //   setSuccessVisible(false);
  // };
  
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
        color: "",
        date: "",
        officer: "",
        description: "",
        agreement: false,
      }}
      validationSchema={Yup.object({
        licenseNumber: Yup.string().required('Это поле обязательно для заполнения'),
        ownerFullName: Yup.string().required('Это поле обязательно для заполнения'),
        type: Yup.string().required('Это поле обязательно для заполнения'),
        color: Yup.string(),
        date: Yup.date(),
        officer: Yup.string(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf([true]),
      })}
      onSubmit={(values) => {
        createCase(values);
        showSuccessMessage();
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoadingCases ? (
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
                          <div className="case__card__form__item__container">
                            <Field
                              type="text"
                              name={"licenseNumber"}
                              className="case__card__form__item__container__input"
                              placeholder="Лицензионный номер '12345'"
                              id="licenseNumber"
                              pattern="^[ 0-9]+$" 
                              required
                            />
                            <ErrorMessage
                              name={"licenseNumber"}
                              className="case__card__form__item__container__invalid"
                              component="div"
                            />
                          </div>
                        </div>

                        <div className="case__card__form__item">
                          <label
                            htmlFor="ownerFullName"
                            className="case__card__form__item__label"
                          >
                            ФИО:
                            <span className="case__card__form__item__label__reqired">*</span>
                          </label>
                          <div className="case__card__form__item__container">
                            <Field
                              type="text"
                              name={"ownerFullName"}
                              className="case__card__form__item__container__input"
                              placeholder="ФИО владельца"
                              id="ownerFullName"
                              required
                            />
                            <ErrorMessage
                              name={"ownerFullName"}
                              className="case__card__form__item__container__invalid"
                              component="div"
                            />
                          </div>
                        </div>

                        <div className="case__card__form__item">
                          <label htmlFor="type" className="case__card__form__item__label">
                            Тип <br/> велосипеда:
                            <span className="case__card__form__item__label__reqired">*</span>
                          </label>
                          <div className="case__card__form__item__container">
                            <Field
                              as={"select"}
                              className="case__card__form__item__container__select"
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
                              className="case__card__form__item__container__invalid"
                              component="div"
                            />
                          </div>
                        </div>

                        <div className="case__card__form__item">
                          <label htmlFor="color" className="case__card__form__item__label">
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
                          <label htmlFor="date" className="case__card__form__item__label">
                            Дата кражи:
                          </label>
                          <Field
                            type="date"
                            name={"date"}
                            className="case__card__form__item__input"
                            id="date"
                          />
                        </div>

                        <div className="case__card__form__item">
                          <label htmlFor="officer" className="case__card__form__item__label">
                            Ответственный <br/> сотрудник:
                          </label>
                          <Field
                            as={"select"}
                            className="case__card__form__item__select"
                            name={"officer"}
                            id="officer"
                          >
                            <option value="">Выберите...</option>

                            {officers
                              .filter((officer) => officer.approved)
                              .map((officer) => {
                                return (
                                  <option key={officer._id} value={officer._id}>
                                    {!officer.firstName || !officer.lastName
                                      ? `Сотрудник ${
                                          !officer.firstName && !officer.lastName
                                            ? officer._id
                                            : officer.firstName ||
                                              officer.lastName
                                        }`
                                      : `${officer.firstName} ${officer.lastName}`}
                                  </option>
                                );
                              })}
                          </Field>
                        </div>

                        <div className="case__card__form__item">
                          <label
                            htmlFor="description"
                            className="case__card__form__item__label"
                          >
                            Дополнительная <br/> информация:
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
      getAllOfficers: () => dispatch(getAllOfficers()),
      createCase: (values) => dispatch(createCase(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton())
    };
  }
)(NewCase);
