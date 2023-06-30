import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAllOfficers } from "../store/Reducers/officersReducer";
import { editCase, getOneCase, handleClickMessageButton} from "../store/Reducers/casesReducer";
import SecondaryButton from "./Modal/SecondaryButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import back from "../img/back.svg"


const CaseDetail = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    officers,
    getAllOfficers,
    editCase,
    bicycleType,
    caseStatus,
    getOneCase,
    someCase,
    isLoading,
    message,
    handleClickMessageButton
  } = props;

  const [isClickedStatus, setIsClickedStatus] = useState(false);
  const [isClickedLicenseNumber, setIsClickedLicenseNumber] = useState(false);
  const [isClickedOwnerFullName, setIsClickedOwnerFullName] = useState(false);
  const [isClickedType, setIsClickedType] = useState(false);
  const [isClickedColor, setIsClickedColor] = useState(false);
  const [isClickedOfficer, setIsClickedOfficer] = useState(false);
  const [isClickedDescription, setIsClickedDescription] = useState(false);
  const [isClickedResolution, setIsClickedResolution] = useState(false);

  const handleClickStatus = () => {
    setIsClickedStatus((prevState) => !prevState);
  };
  const handleClickLicenseNumber = () => {
    setIsClickedLicenseNumber((prevState) => !prevState);
  };
  const handleClickOwnerFullName = () => {
    setIsClickedOwnerFullName((prevState) => !prevState);
  };
  const handleClickType = () => {
    setIsClickedType((prevState) => !prevState);
  };
  const handleClickColor = () => {
    setIsClickedColor((prevState) => !prevState);
  };
  const handleClickOfficer = () => {
    setIsClickedOfficer((prevState) => !prevState);
  };
  const handleClickDescription = () => {
    setIsClickedDescription((prevState) => !prevState);
  };
  const handleClickResolution = () => {
    setIsClickedResolution((prevState) => !prevState);
  };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.which === 13 || e.keyCode === 13) {
      setIsClickedLicenseNumber(false);
      setIsClickedOwnerFullName(false);
      setIsClickedColor(false);
      setIsClickedDescription(false);
      setIsClickedResolution(false);
    }
  };

  useEffect(() => {
    getOneCase(id);
  }, [dispatch, getOneCase, id]);

  useEffect(() => {
    getAllOfficers();
  }, [getAllOfficers]);

  const handleClickMessage = () => {
    navigate(`/cases`);
    handleClickMessageButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        status: someCase.status || "",
        licenseNumber: someCase.licenseNumber || "",
        ownerFullName: someCase.ownerFullName || "",
        type: someCase.type || "",
        color: someCase.color || "",
        officer: someCase.officer || "",
        description: someCase.description || "",
        resolution: someCase.resolution || "",
      }}
      validationSchema={Yup.object({
        status: Yup.string(),
        licenseNumber: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        ownerFullName: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        type: Yup.string().nullable(),
        color: Yup.string().nullable(),
        officer: Yup.string().nullable(),
        description: Yup.string().nullable(),
        resolution: Yup.string()
          .nullable()
          .when("status", {
            is: (value) => value === "done",
            then: Yup.string()
              .nullable()
              .required("Это поле обязательно для заполнения"),
          }),
      })}
      onSubmit={(values) => {
        editCase(someCase._id, values);
        setIsClickedStatus(false);
        setIsClickedLicenseNumber(false);
        setIsClickedOwnerFullName(false);
        setIsClickedColor(false);
        setIsClickedType(false);
        setIsClickedOfficer(false);
        setIsClickedDescription(false);
        setIsClickedResolution(false);
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
                    <Form className="caseDetail__form">
                      <div colSpan="2" className="caseDetail__form__editTime">
                        <div>
                          Сообщение было создано{" "}
                          {new Date(
                            someCase.createdAt
                          ).toLocaleDateString()}{" "}
                          в{" "}
                          {new Date(
                            someCase.createdAt
                          ).toLocaleTimeString()}
                        </div>

                        {someCase && (
                          <div>
                            {!someCase.updatedAt
                              ? "Сообщение не редактировалось"
                              : `Сообщение было отредактировано ${new Date(
                                  someCase.updatedAt
                                ).toLocaleDateString()} в ${new Date(
                                  someCase.updatedAt
                                ).toLocaleTimeString()}`}
                          </div>
                        )}
                      </div>

                      <div>
                        <div onClick={handleClickStatus} className="caseDetail__form__item">
                          <div className="caseDetail__form__item__label">Статус</div>
                          <div className="caseDetail__form__item__disabled">
                            {!isClickedStatus ? (
                              (values.status === "new" && "Открыто") ||
                              (values.status === "in_progress" && "В процессе") ||
                              (values.status === "done" && "Завершено")
                            ) : (
                              <Field
                                as="select"
                                className="caseDetail__form__item__select"
                                name="status"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="DEFAULT" disabled>
                                  Выберите...
                                </option>
                                {caseStatus &&
                                  caseStatus.map((item, index) => {
                                    return (
                                      <option value={item.value} key={index}>
                                        {item.title}
                                      </option>
                                    );
                                  })}
                              </Field>
                            )}
                          </div>
                        </div>

                        {values.status === "done" && (
                          <div
                            onClick={handleClickResolution}
                            className="caseDetail__form__item"
                          >
                            <div className="caseDetail__form__item__label">Решение</div>
                            <div className="caseDetail__form__item__disabled">
                              {!isClickedResolution &&
                              someCase && !someCase.resolution ? (
                                <Field
                                  as="textarea"
                                  className="caseDetail__form__item__textarea"
                                  name={"resolution"}
                                  placeholder="Опишите как был решён случай"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ) : (
                                values.resolution
                              )}
                              <ErrorMessage
                                name={"resolution"}
                                component="div"
                                className="caseDetail__form__item__input__invalid"
                              />
                            </div>
                          </div>
                        )}

                        <div
                          onClick={handleClickLicenseNumber}
                          className="caseDetail__form__item"
                        >
                          <div className="caseDetail__form__item__label">Лицензионный номер</div>

                          <div className="caseDetail__form__item__disabled">
                            {!isClickedLicenseNumber ? (
                              values.licenseNumber
                            ) : (
                              <Field
                                type="text"
                                name={"licenseNumber"}
                                className="caseDetail__form__item__input"
                                placeholder={"Введите лицензионный номер"}
                                onKeyPress={handleKeyPress}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <ErrorMessage
                              name={"licenseNumber"}
                              component="div"
                              className="caseDetail__form__item__input__invalid"
                            />
                          </div>
                        </div>

                        <div
                          onClick={handleClickOwnerFullName}
                          className="caseDetail__form__item"
                        >
                          <div className="caseDetail__form__item__label">ФИО</div>

                          <div className="caseDetail__form__item__disabled">
                            {!isClickedOwnerFullName ? (
                              values.ownerFullName
                            ) : (
                              <Field
                                type="text"
                                name={"ownerFullName"}
                                className="caseDetail__form__item__input"
                                placeholder={"Введите ФИО владельца"}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <ErrorMessage
                              name={"ownerFullName"}
                              component="div"
                              className="caseDetail__form__item__input__invalid"
                            />
                          </div>
                        </div>

                        <div 
                          onClick={handleClickType} 
                          className="caseDetail__form__item"
                        >
                          <div className="caseDetail__form__item__label">Тип</div>

                          <div className="caseDetail__form__item__disabled">
                            {!isClickedType ? (
                              (values.type === "general" && "Обычный") ||
                              (values.type === "sport" && "Спортивный")
                            ) : (
                              <Field
                                as="select"
                                className="caseDetail__form__item__select"
                                name="type"
                                onClick={(e) => e.stopPropagation()}
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
                            )}
                          </div>
                        </div>

                        <div 
                          onClick={handleClickColor} 
                          className="caseDetail__form__item"
                        >
                          <div className="caseDetail__form__item__label">Цвет</div>

                          <div className="caseDetail__form__item__disabled">
                            {!isClickedColor ? (
                              values.color
                            ) : (
                              <Field
                                type="text"
                                name={"color"}
                                className="caseDetail__form__item__input"
                                placeholder={"Напишите цвет велосипеда"}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                          </div>
                        </div>

                        <div 
                          onClick={handleClickOfficer} 
                          className="caseDetail__form__item"
                        >
                          <div className="caseDetail__form__item__label">Сотрудник</div>

                          <div className="caseDetail__form__item__disabled">
                            {!isClickedOfficer ? (
                              officers.find(
                                (officer) => officer._id === values.officer
                              ) &&
                              `${
                                !officers.find(
                                  (officer) => officer._id === values.officer
                                ).firstName
                                  ? "Сотрудник"
                                  : officers.find(
                                      (officer) =>
                                        officer._id === values.officer
                                    ).firstName
                              } ${
                                !officers.find(
                                  (officer) => officer._id === values.officer
                                ).lastName
                                  ? officers.find(
                                      (officer) =>
                                        officer._id === values.officer
                                    )._id
                                  : officers.find(
                                      (officer) =>
                                        officer._id === values.officer
                                    ).lastName
                              }`
                            ) : (
                              <Field
                                as="select"
                                className="caseDetail__form__item__select"
                                name="officer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="">Выберите...</option>
                                {officers
                                  .filter((officer) => officer.approved)
                                  .map((officer) => {
                                    return (
                                      <option
                                        key={officer._id}
                                        value={officer._id}
                                      >
                                        {!officer.firstName ||
                                        !officer.lastName
                                          ? `Сотрудник ${officer._id}`
                                          : `${officer.firstName} ${officer.lastName}`}
                                      </option>
                                    );
                                  })}
                              </Field>
                            )}
                          </div>
                        </div>

                        <div
                          onClick={handleClickDescription}
                          className="caseDetail__form__item"
                        >
                          <div className="caseDetail__form__item__label">Описание</div>

                          <div className="caseDetail__form__item__disabled">
                            {!isClickedDescription ? (
                              values.description
                            ) : (
                              <Field
                                as="textarea"
                                className="caseDetail__form__item__textarea"
                                name={"description"}
                                placeholder="Опишите случай"
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                          </div>
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
      officers: state.officersReducer.officers,
      someCase: state.casesReducer.case,
      caseStatus: state.casesReducer.bicycle.caseStatus,
      bicycleType: state.casesReducer.bicycle.bicycleType,
      isLoading: state.casesReducer.isLoading,
      message: state.casesReducer.message,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      getOneCase: (id) => dispatch(getOneCase(id)),
      editCase: (id, values) => dispatch(editCase(id, values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(CaseDetail);
