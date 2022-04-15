import React, { useState } from "react";
import Fetch from "../../../components/Fetch.js";
import Loader from "../../../components/Loader.jsx";
import NotAuthorized from "../../../components/NotAuthorized.jsx";
import { stateUser } from "../../../store/Usuario/reducer.js";
import { connect } from "react-redux";

function getCitas(setCitas, setPeticion, setLoading) {
  Fetch("get/citas")
    .then(({ data }) => {
      setPeticion(false);
      setCitas(data);
      setLoading(false);
    })
    .catch((err) => {
    });
}

/**
 *
 */
function Citas({ setUserData }) {
  const [peticion, setPeticion] = useState(true);
  const [loading, setLoading] = useState(true);
  const [citas, setCitas] = useState([]);
  const { Role } = setUserData;

  if (Role && Role !== "admin") {
    return <NotAuthorized />;
  }

  if (peticion) {
    getCitas(setCitas, setPeticion, setLoading);
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="card-columns">
      {citas.map(({ quote, series, author }, xId) => {
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{quote}</h5>
              <p className="card-text">{author}</p>
              <p className="card-text">
                <span className="badge badge-primary">{series}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 *
 * @param {*} state
 */
 const mapToStateData = (state) => {
  return {
    ...state,
    ...stateUser,
  };
};
export default connect(mapToStateData)(Citas);
