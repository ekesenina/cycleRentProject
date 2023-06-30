import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCase, getAllCases, handleClickMessageButton } from "../store/Reducers/casesReducer";
import SecondaryButton from "./Modal/SecondaryButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import back from "../img/back.svg"


const CasesList = (props) => {
  const {
    cases,
    getAllCases,
    deleteCase,
    isLoading,
    message,
    handleClickMessageButton
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getAllCases();
  }, [getAllCases]);

  const handleRowClick = (id, e) => {
    navigate(`/cases/${id}`);
    e.stopPropagation();
  };

  const handleButtonClick = (id, e) => {
    deleteCase(id);
    e.stopPropagation();
  };

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {message ? (
            <Message message={message} onClick={handleClickMessage} />
          ) : (
            <div className="list">
              <Link onClick={() => navigate(-1)}>
                <img src={back} alt="logo" className="list__back" />
              </Link>
              <h1 className="list__title">все случаи краж</h1>
              <table className="list__table">
                <thead className="list__table__head">
                  <tr>
                    <th scope="col" className="list__table__head__item"></th>
                    <th scope="col" className="list__table__head__item">
                      Лицензионный номер
                    </th>
                    <th scope="col" className="list__table__head__item">
                      Тип
                    </th>
                    <th scope="col" className="list__table__head__item">
                      Цвет
                    </th>
                    <th scope="col" className="list__table__head__item">
                      Описание
                    </th>
                    <th scope="col" className="list__table__head__item"></th>
                  </tr>
                </thead>

                <tbody className="list__table__body">
                  {cases.map((item, index) => {
                    return (
                      <tr
                        className="list__table__body__item"
                        key={item._id}
                        onClick={(e) => handleRowClick(item._id, e)}
                      >
                        <th scope="row" className="list__table__body__item__number">
                          {index + 1}
                        </th>

                        <td data-label="Лицензионный номер:" className="list__table__body__item__link">
                          <p className="list__table__body__item__link__text">{item.licenseNumber}</p>
                        </td>

                        <td data-label="Тип:" className="list__table__body__item__link">
                          <p className="list__table__body__item__link__text">
                            {(item.type === "sport" && "Sport") ||
                              (item.type === "general" && "General")}
                          </p>
                        </td>

                        <td data-label="Цвет:" className="list__table__body__item__link">
                          <p className="list__table__body__item__link__text">{item.color}</p>
                        </td>

                        <td data-label="Описание:" className="list__table__body__item__link">
                          <p className="list__table__body__item__link__text">{item.description}</p>
                        </td>
                        <th>
                          <SecondaryButton
                            title={"Удалить"}
                            type={"button"}
                            className="list__table__body__item__button"
                            id={item._id}
                            onClick={(e) => handleButtonClick(item._id, e)}
                          />
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default connect(
  (state) => {
    return {
      cases: state.casesReducer.cases,
      isLoading: state.casesReducer.isLoading,
      message: state.casesReducer.message,
    };
  },
  (dispatch) => {
    return {
      deleteCase: (id) => dispatch(deleteCase(id)),
      getAllCases: () => dispatch(getAllCases()),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(CasesList);
