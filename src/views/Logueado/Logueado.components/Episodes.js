import React, { useState } from "react";
import Fetch from "../../../components/Fetch.js";
import Loader from "../../../components/Loader.jsx";
import NotAuthorized from "../../../components/NotAuthorized.jsx";
import { stateUser } from "../../../store/Usuario/reducer.js";
import { connect } from "react-redux";

function getEpisodes(setEpisodes, setPeticion, setLoading) {
  Fetch("get/episodes")
    .then(({ data }) => {
      setPeticion(false);
      setEpisodes(data);
      setLoading(false);
    })
    .catch((err) => {
    });
}

/**
 *
 */
function Episodes({ setUserData }) {
  const [peticion, setPeticion] = useState(true);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const { Role } = setUserData;

  if (peticion) {
    getEpisodes(setEpisodes, setPeticion, setLoading);
  }

  if (Role && Role !== "admin") {
    return <NotAuthorized />;
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
      {episodes.map(
        ({ air_date, characters, title, season, episode, series }, xId) => {
          return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {title} {"(Temporada: "}
                  {season} {" Episodio: "} {episode}
                  {")"}
                </h5>
                <p className="card-text">{air_date}</p>
                <p className="card-text">
                  <span className="badge badge-primary">{series}</span>
                </p>
                <p className="card-text">
                  <b>Personajes:</b>
                </p>
                <ul className="list-group list-group-flush">
                  {characters.map((c) => (
                    <li className="list-group-item">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
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
export default connect(mapToStateData)(Episodes);
