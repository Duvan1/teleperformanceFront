import React from "react";
import { Link } from "react-router-dom";
import { stateUser } from "../../../store/Usuario/reducer.js";
import { connect } from "react-redux";

/**
 *
 */
function Welcome({ setUserData }) {
  const { Role } = setUserData;
  return (
    <div className="card-deck mb-3 text-center">
      <div className="card mb-4 box-shadow">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Personajes</h4>
        </div>
        <img
          src={
            "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg"
          }
          alt="BigCo Inc. logo"
        />
        <div className="card-body">
          <Link to="/characters" className="btn btn-lg btn-block btn-primary">
            Ir a personajes
          </Link>
        </div>
      </div>
      {Role === "admin" && (
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Episodios</h4>
          </div>
          <img
            className="img-fluid"
            src={
              "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441"
            }
            alt="BigCo Inc. logo"
          />
          <div className="card-body">
            <Link to="/episodes" className="btn btn-lg btn-block btn-primary">
              Ir a episodios
            </Link>
          </div>
        </div>
      )}

      {Role === "admin" && (
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Citas</h4>
          </div>
          <img
            className="img-fluid"
            src={
              "https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg"
            }
            alt="BigCo Inc. logo"
          />
          <div className="card-body">
            <Link to="/citas" className="btn btn-lg btn-block btn-primary">
              Ir a citas
            </Link>
          </div>
        </div>
      )}
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

export default connect(mapToStateData)(Welcome);
