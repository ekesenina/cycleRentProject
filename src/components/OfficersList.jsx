import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import officerList from "../img/officerList.png";
import { deleteOfficer, getAllOfficers, handleClickMessageButton } from "../store/Reducers/officersReducer";
import SecondaryButton from "./Modal/SecondaryButton";
import Loading from "./Modal/Loading";
import Message from "./Modal/Message";
import back from "../img/back.svg"


const OfficersList = (props) => {

  const {
    officers,
    getAllOfficers,
    deleteOfficer,
    isLoading,
    message,
    handleClickMessageButton,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getAllOfficers();
  }, [getAllOfficers]);

  const handleRowClick = (id, e) => {
    navigate(`/officers/${id}`);
    e.preventDefault();
  };

  const handleButtonClick = (id, e) => {
    deleteOfficer(id);
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
              <h1 className="list__title">список сотрудников</h1>
              <table className="list__table" id={"listOfOfficersTable"}>
                <thead className="list__table__head">
                  <tr>
                    <th scope="col" className="list__table__head__item">
                      <img src={officerList} alt="img" />
                    </th>

                    <th className="list__table__head__item">ФИО</th>

                    <th className="list__table__head__item">E-mail</th>
                    <th className="list__table__head__item">Одобрен</th>
                    <th scope="col" className="list__table__head__item"></th>
                  </tr>
                </thead>
                <tbody className="list__table__body">
                  {officers &&
                    officers.map((item, index) => {
                      return (
                        <tr
                          className="list__table__body__item"
                          key={item._id}
                          onClick={(e) => handleRowClick(item._id, e)}
                        >
                          <th scope="row" className="list__table__body__item__number">
                            {index + 1}
                          </th>
                          <td data-label="ФИО:" className="list__table__body__item__link">
                            <p className="list__table__body__item__link__text">
                              {!item.firstName && !item.lastName
                                ? `Имя и фамилия не введены`
                                : `${
                                    item.firstName && item.lastName
                                      ? `${item.firstName} ${item.lastName}`
                                      : `${item.firstName || item.lastName}`
                                  }`}
                            </p>
                          </td>
                          <td data-label="E-mail:" className="list__table__body__item__link">
                            <p className="list__table__body__item__link__text">{item.email}</p>
                          </td>
                          <td data-label="Одобрен:" className="list__table__body__item__link">
                            <p className="list__table__body__item__link__text">
                              <div>
                                <input
                                  type="checkbox"
                                  name={"approved"}
                                  defaultChecked={item.approved}
                                />
                              </div>
                            </p>
                          </td>
                          <th>
                            <SecondaryButton
                              title={"Удалить"}
                              type={"button"}
                              className="list__table__body__item__button"
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
      officers: state.officersReducer.officers,
      isLoading: state.officersReducer.isLoading,
      message: state.officersReducer.message,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      deleteOfficer: (id) => dispatch(deleteOfficer(id)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(OfficersList);
